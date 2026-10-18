import fs from 'fs';
import path from 'path';
import { createClient } from 'next-sanity';

let token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  try {
    const envFile = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf-8');
    const match = envFile.match(/SANITY_API_WRITE_TOKEN=([^\r\n]+)/);
    if (match) token = match[1].trim();
  } catch (err) {}
}

if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN in .env.local');
  process.exit(1);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gt5606kp';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-03-01',
  useCdn: false,
  token,
});

interface Span {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
}

interface MarkDef {
  _type: 'link';
  _key: string;
  href: string;
}

interface Block {
  _type: 'block';
  _key: string;
  style: 'normal' | 'h2' | 'h3' | 'h4' | 'blockquote';
  listItem?: 'bullet' | 'number';
  level?: number;
  children: Span[];
  markDefs: MarkDef[];
}

function generateKey(prefix: string, index: number, subIndex?: number): string {
  const rand = Math.random().toString(36).substring(2, 6);
  return `${prefix}_${index}${subIndex !== undefined ? `_${subIndex}` : ''}_${rand}`;
}

/**
 * Parses inline HTML tags (strong, em, a) into Sanity Spans and MarkDefs
 */
function parseInlineHtml(htmlSnippet: string, blockKey: string): { spans: Span[]; markDefs: MarkDef[] } {
  const markDefs: MarkDef[] = [];
  const spans: Span[] = [];

  // Tokenize by html tags: <strong>, </strong>, <em>, </em>, <a ...>, </a>
  const tagRegex = /<(\/?[a-zA-Z0-9]+)([^>]*)>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const currentMarks: string[] = [];
  let linkCounter = 0;

  function addSpan(rawText: string) {
    // Decode HTML entities
    const text = rawText
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

    if (text.length > 0) {
      spans.push({
        _type: 'span',
        _key: generateKey('s', spans.length),
        text,
        marks: [...currentMarks],
      });
    }
  }

  while ((match = tagRegex.exec(htmlSnippet)) !== null) {
    const textBefore = htmlSnippet.slice(lastIndex, match.index);
    if (textBefore) {
      addSpan(textBefore);
    }

    const tagName = match[1].toLowerCase();
    const isClosing = tagName.startsWith('/');
    const tagBase = isClosing ? tagName.slice(1) : tagName;
    const tagAttrs = match[2] || '';

    if (!isClosing) {
      if (tagBase === 'strong' || tagBase === 'b') {
        currentMarks.push('strong');
      } else if (tagBase === 'em' || tagBase === 'i') {
        currentMarks.push('em');
      } else if (tagBase === 'u') {
        currentMarks.push('underline');
      } else if (tagBase === 'a') {
        const hrefMatch = /href=["']([^"']+)["']/i.exec(tagAttrs);
        const href = hrefMatch ? hrefMatch[1] : '';
        if (href) {
          const linkKey = `link_${blockKey}_${linkCounter++}`;
          markDefs.push({
            _type: 'link',
            _key: linkKey,
            href,
          });
          currentMarks.push(linkKey);
        }
      }
    } else {
      if (tagBase === 'strong' || tagBase === 'b') {
        const idx = currentMarks.lastIndexOf('strong');
        if (idx !== -1) currentMarks.splice(idx, 1);
      } else if (tagBase === 'em' || tagBase === 'i') {
        const idx = currentMarks.lastIndexOf('em');
        if (idx !== -1) currentMarks.splice(idx, 1);
      } else if (tagBase === 'u') {
        const idx = currentMarks.lastIndexOf('underline');
        if (idx !== -1) currentMarks.splice(idx, 1);
      } else if (tagBase === 'a') {
        const idx = currentMarks.findIndex((m) => m.startsWith('link_'));
        if (idx !== -1) currentMarks.splice(idx, 1);
      }
    }

    lastIndex = tagRegex.lastIndex;
  }

  const remainingText = htmlSnippet.slice(lastIndex);
  if (remainingText) {
    addSpan(remainingText);
  }

  if (spans.length === 0) {
    spans.push({
      _type: 'span',
      _key: generateKey('s', 0),
      text: '',
      marks: [],
    });
  }

  return { spans, markDefs };
}

/**
 * Converts raw HTML string into Sanity Portable Text blocks
 */
export function htmlToPortableText(html: string): Block[] {
  const blocks: Block[] = [];
  if (!html) return blocks;

  // Clean script, style, comments
  const clean = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<style[\s\S]*?<\/style>/gi, '');

  // Regex to match block-level elements: h2, h3, h4, p, ul, ol, blockquote, div
  const blockRegex = /<(h[2-4]|p|ul|ol|blockquote|div)([^>]*)>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;
  let blockIndex = 0;

  while ((match = blockRegex.exec(clean)) !== null) {
    const tag = match[1].toLowerCase();
    const attrs = match[2] || '';
    const innerContent = match[3].trim();

    if (!innerContent) continue;

    if (tag === 'h2' || tag === 'h3' || tag === 'h4') {
      const blockKey = generateKey('b', blockIndex++);
      const { spans, markDefs } = parseInlineHtml(innerContent, blockKey);
      blocks.push({
        _type: 'block',
        _key: blockKey,
        style: tag as any,
        children: spans,
        markDefs,
      });
    } else if (tag === 'p') {
      const blockKey = generateKey('b', blockIndex++);
      const { spans, markDefs } = parseInlineHtml(innerContent, blockKey);
      blocks.push({
        _type: 'block',
        _key: blockKey,
        style: 'normal',
        children: spans,
        markDefs,
      });
    } else if (tag === 'blockquote' || (tag === 'div' && attrs.includes('border-left'))) {
      const blockKey = generateKey('b', blockIndex++);
      const { spans, markDefs } = parseInlineHtml(innerContent, blockKey);
      blocks.push({
        _type: 'block',
        _key: blockKey,
        style: 'blockquote',
        children: spans,
        markDefs,
      });
    } else if (tag === 'ul' || tag === 'ol') {
      const listItemType = tag === 'ul' ? 'bullet' : 'number';
      const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
      let liMatch: RegExpExecArray | null;

      while ((liMatch = liRegex.exec(innerContent)) !== null) {
        const liContent = liMatch[1].trim();
        if (!liContent) continue;

        const blockKey = generateKey('b', blockIndex++);
        const { spans, markDefs } = parseInlineHtml(liContent, blockKey);
        blocks.push({
          _type: 'block',
          _key: blockKey,
          style: 'normal',
          listItem: listItemType,
          level: 1,
          children: spans,
          markDefs,
        });
      }
    }
  }

  return blocks;
}

async function main() {
  console.log('Fetching all blog posts from Sanity...');
  const posts = await client.fetch<Array<{ _id: string; title: string; slug: { current: string }; contentHtml: string }>>(
    `*[_type == "post"] { _id, title, slug, contentHtml }`
  );

  console.log(`Found ${posts.length} posts to convert to visual Portable Text blocks.`);

  for (const post of posts) {
    if (!post.contentHtml) {
      console.log(`- Skipping ${post.title} (no contentHtml)`);
      continue;
    }

    const blocks = htmlToPortableText(post.contentHtml);
    console.log(`- Converting "${post.title}" (${post._id}): generated ${blocks.length} visual blocks.`);

    await client
      .patch(post._id)
      .set({ body: blocks })
      .commit();

    console.log(`  ✓ Updated ${post._id} with visual rich text body.`);
  }

  console.log('\nAll posts successfully converted to Sanity visual Portable Text!');
}

main().catch((err) => {
  console.error('Migration error:', err);
  process.exit(1);
});
