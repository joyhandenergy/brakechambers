/**
 * Comprehensive mapping between local data slugs (e.g. 't2030-metric-pd') 
 * and Sanity CMS slugs (e.g. 'type-2030-2-12in-metric-heavy-duty').
 * 
 * Ensures dual-slug resolution so that neither legacy local URLs nor 
 * new Sanity CMS URLs ever produce 404 errors.
 */

import type { BrakeChamber } from '@/types';

export const LOCAL_TO_SANITY_SLUG: Record<string, string> = {
  "t16-single": "type-16-2-12in",
  "t20-single": "type-20-2-12in",
  "t24-single": "type-24-2-12in",
  "t30-single": "type-30-2-12in",
  "t20-mgm": "type-20-2-12in-mgm-style",
  "t24-mgm": "type-24-2-12in-mgm-style",
  "t30-mgm": "type-30-2-12in-mgm-style",
  "t36-mgm": "type-36-2-12in-mgm-style",
  "t16-short": "type-16-2-12in-short-stroke",
  "t20-short": "type-20-2-12in-short-stroke",
  "t24-short": "type-24-2-12in-short-stroke",
  "t24-flange": "type-24-2-12in-japanese-flange",
  "t30-flange": "type-30-2-12in-japanese-flange",
  "ram1620": "ram-1620-2-12in-air-hydraulic-ram",
  "ram2025": "ram-2025-2-12in-air-hydraulic-ram",
  "ram2425": "ram-2425-2-12in-air-hydraulic-ram",
  "ram2030": "ram-2030-2-12in-air-hydraulic-ram",
  "ram2430": "ram-2430-2-12in-air-hydraulic-ram",
  "t2024-short": "type-2024-2-12in-short-rod",
  "t2424-short": "type-2424-2-12in-short-rod",
  "t2424-mgm-spring": "type-2424-2-12in-mgm-spring",
  "t2430-mgm-spring": "type-2430-2-12in-mgm-spring",
  "t3030-mgm-spring": "type-3030-2-12in-mgm-spring",
  "t3036-mgm-spring": "type-3036-2-12in-mgm-spring",
  "t3636-mgm-spring": "type-3636-2-12in-mgm-spring",
  "t1624-short-stroke-spring": "type-1624-2-12in-short-stroke-spring",
  "t2024-short-stroke-spring": "type-2024-2-12in-short-stroke-spring",
  "t2024-japanese-flange-spring": "type-2024-2-12in-japanese-flange-spring",
  "t2424-japanese-flange-spring": "type-2424-2-12in-japanese-flange-spring",
  "t2430-japanese-flange-spring": "type-2430-2-12in-japanese-flange-spring",
  "ud340-rear": "ud340-rear-2-12in-nissan-ud-piston-diaphragm",
  "cw520-rear": "cw520-rear-2-12in-nissan-ud-piston-diaphragm",
  "t9a-boss": "type-9-2-12in-boss-mounted",
  "t12b-boss": "type-12-2-12in-boss-mounted",
  "hino-sh": "hino-sh-2-12in-4-stud-heavy-duty",
  "hino-he": "hino-he-2-12in-4-stud-heavy-duty",
  "fv310-he": "fv310-2-12in-4-stud-heavy-duty",
  "t0920-boss": "type-0920-2-12in-boss-mounted",
  "t1220a-boss": "type-1220-2-12in-boss-mounted",
  "t1624-wabco-pd": "type-1624-2-12in-wabco-style",
  "t2024-wabco-pd": "type-2024-2-12in-wabco-style",
  "t2424-wabco-pd": "type-2424-2-12in-wabco-style",
  "t2030-metric-pd": "type-2030-2-12in-metric-heavy-duty",
  "t2430-metric-pd": "type-2430-2-12in-metric-heavy-duty",
  "t3030-metric-pd": "type-3030-2-12in-metric-heavy-duty",
  "t2024-voss": "type-2024-2-12in-voss-port",
  "t2424-wabco-pd-std": "type-2424-2-12in-standard-port",
  "t3030-voss": "type-3030-2-12in-voss-port",
  "t1616-short-pd": "type-1616-2-12in-short-stroke",
  "t2416-short-pd": "type-2416-2-12in-short-stroke",
  "t1424-short-pd-combo": "type-1424-2-12in-short-stroke",
  "t1624-short-pd-combo": "type-1624-2-12in-short-stroke",
  "t2024-short-pd-combo": "type-2024-2-12in-short-stroke",
  "t2424-short-pd-combo": "type-2424-2-12in-short-stroke",
  "t2430-short-pd-combo": "type-2430-2-12in-short-stroke",
  "t2424-fuso193": "type-2424-2-12in-4-bolt-flange",
  "t3024-hino420": "type-3024-2-12in-4-bolt-flange",
  "isuzu-10pc1-330": "10pc1-330-rear-2-12in-4-stud-heavy-duty",
  "isuzu-10pd1-340": "10pd1-340-rear-2-12in-4-stud-heavy-duty"
};

export const SANITY_TO_LOCAL_SLUG: Record<string, string> = Object.entries(LOCAL_TO_SANITY_SLUG).reduce(
  (acc, [local, sanity]) => {
    acc[sanity] = local;
    return acc;
  },
  {} as Record<string, string>
);

/**
 * Normalizes a slug or string for tolerant comparison (strips non-alphanumeric chars).
 */
export function normalizeSlug(str: string): string {
  try {
    str = decodeURIComponent(str);
  } catch {}
  return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Checks if a product matches a requested slug, taking aliases and cross-references into account.
 */
export function matchProductSlug(productSlug: string, requestedSlug: string, aliases?: string[]): boolean {
  if (!productSlug || !requestedSlug) return false;
  if (productSlug === requestedSlug) return true;

  // Handle URL decoded variations
  let cleanRequested = requestedSlug.trim();
  try {
    cleanRequested = decodeURIComponent(cleanRequested).trim();
  } catch {}

  if (productSlug === cleanRequested) return true;

  // Direct mapping check
  if (LOCAL_TO_SANITY_SLUG[productSlug] === cleanRequested) return true;
  if (SANITY_TO_LOCAL_SLUG[productSlug] === cleanRequested) return true;
  if (LOCAL_TO_SANITY_SLUG[cleanRequested] === productSlug) return true;
  if (SANITY_TO_LOCAL_SLUG[cleanRequested] === productSlug) return true;

  // Aliases check
  if (aliases && (aliases.includes(cleanRequested) || aliases.includes(productSlug))) return true;

  // Split spaces or accidental duplicates (e.g. "type-2030-2-12in-metric-heavy-duty -2030-2-12in-metric-heavy-duty")
  const parts = cleanRequested.split(/\s+/).filter(Boolean);
  for (const part of parts) {
    if (part === productSlug) return true;
    if (LOCAL_TO_SANITY_SLUG[part] === productSlug) return true;
    if (SANITY_TO_LOCAL_SLUG[part] === productSlug) return true;
    if (LOCAL_TO_SANITY_SLUG[productSlug] === part) return true;
    if (SANITY_TO_LOCAL_SLUG[productSlug] === part) return true;
  }

  // Normalized alphanumeric check
  const pNorm = normalizeSlug(productSlug);
  const rNorm = normalizeSlug(cleanRequested);
  if (pNorm === rNorm && pNorm.length >= 3) return true;

  // Check if one contains the other (e.g. compound or repeated slug)
  if (pNorm.length >= 8 && rNorm.length >= 8) {
    if (rNorm.startsWith(pNorm) || pNorm.startsWith(rNorm)) return true;
  }

  return false;
}

/**
 * Robust product finder across an array of BrakeChambers.
 * Handles both local and Sanity slug representations seamlessly.
 */
export function findProductBySlug(
  products: BrakeChamber[],
  requestedSlug: string,
  category?: string
): BrakeChamber | undefined {
  if (!requestedSlug || !Array.isArray(products) || products.length === 0) return undefined;

  let cleanReq = requestedSlug.trim();
  try {
    cleanReq = decodeURIComponent(cleanReq).trim();
  } catch {}

  // Filter by category first if specified
  const candidatePool = category
    ? products.filter(p => p.category === category)
    : products;

  // 1. Exact match
  const exact = candidatePool.find(p => p.slug === cleanReq);
  if (exact) return exact;

  // 2. Cross-map match (Sanity slug <-> Local slug, aliases, accidental duplicates)
  const mapped = candidatePool.find(p =>
    matchProductSlug(p.slug, cleanReq, (p as any).aliases)
  );
  if (mapped) return mapped;

  // 3. Check each token in requested slug
  const tokens = cleanReq.split(/\s+/).filter(Boolean);
  if (tokens.length > 1) {
    for (const t of tokens) {
      const tokenMatch = candidatePool.find(p =>
        matchProductSlug(p.slug, t, (p as any).aliases)
      );
      if (tokenMatch) return tokenMatch;
    }
  }

  // 4. Name slug match (in case requestedSlug matches slugified product name)
  const reqNorm = normalizeSlug(cleanReq);
  const nameMatch = candidatePool.find(p => {
    const nameNorm = normalizeSlug(p.name);
    return nameNorm === reqNorm || (reqNorm.length >= 8 && (nameNorm.includes(reqNorm) || reqNorm.includes(nameNorm)));
  });
  if (nameMatch) return nameMatch;

  // 5. Model designation match (e.g. 'T20/30' or 'RAM2030')
  const modelMatch = candidatePool.find(p => {
    if (!p.modelDesignation) return false;
    const mNorm = normalizeSlug(p.modelDesignation);
    return mNorm === reqNorm || (mNorm.length >= 3 && reqNorm.includes(mNorm));
  });
  if (modelMatch) return modelMatch;

  // 6. If category was specified but not found, check across all products in case category was slightly different
  if (category) {
    return findProductBySlug(products, requestedSlug, undefined);
  }

  return undefined;
}

/**
 * Returns all valid URL slug parameters for a product to generate static params.
 */
export function getAllSlugsForProduct(slug: string): string[] {
  const result = new Set<string>();
  if (slug) result.add(slug);
  if (LOCAL_TO_SANITY_SLUG[slug]) result.add(LOCAL_TO_SANITY_SLUG[slug]);
  if (SANITY_TO_LOCAL_SLUG[slug]) result.add(SANITY_TO_LOCAL_SLUG[slug]);
  return Array.from(result);
}
