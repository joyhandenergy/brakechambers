import { defineField, defineType } from 'sanity'

const postGroups = [
  { name: 'content', title: 'Content', default: true },
  { name: 'seo', title: 'SEO' },
];

const postCategories = [
  'Technical Guides',
  'How-To & Repair',
  'Buying & Sourcing',
  'Fleet Management',
  'Industry & Compliance',
];

const postOrderings = [
  { title: 'Newest first', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] as any },
];

// Mirrors the BlogPost type in src/data/blogPosts.ts.
export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: postGroups,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      description: 'The blog post address: /blog/<slug>. Avoid changing it after publishing.',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      options: {
        list: postCategories,
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'publishedAt', title: 'Publish Date', type: 'date', group: 'content', validation: (r) => r.required() }),
    defineField({ name: 'readTime', title: 'Read Time', type: 'string', group: 'content', description: 'e.g. 7 min read' }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Short summary shown on blog cards.',
    }),
    defineField({
      name: 'imageUrl',
      title: 'Cover Image URL',
      type: 'string',
      group: 'content',
      description: 'Path or link to the cover image. Ignored if a Cover Image is uploaded below.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image (upload)',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    }),
    defineField({
      name: 'body',
      title: 'Article Body (Visual Editor)',
      type: 'blockContent',
      group: 'content',
      description: 'Visual rich text editor. Write, format, and add images directly without code.',
    }),
    defineField({
      name: 'contentHtml',
      title: 'Legacy HTML (Fallback)',
      type: 'text',
      rows: 10,
      group: 'content',
      description: 'Legacy raw HTML content. Used automatically as a fallback if visual Article Body is empty.',
      hidden: true,
    }),
    defineField({ name: 'seo', title: 'SEO Settings', type: 'seo', group: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'mainImage' },
  },
})
