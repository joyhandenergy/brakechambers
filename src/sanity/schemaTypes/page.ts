import { defineField, defineType } from 'sanity'

const pageOrderings = [{ title: 'Address', name: 'pathAsc', by: [{ field: 'path', direction: 'asc' }] } as any];

// One document per fixed website page (home, category pages, warranty, ...).
// The page layout stays in code; this only controls the page's SEO tags.
export const page = defineType({
  name: 'page',
  title: 'Page SEO',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Name', type: 'string', description: 'Internal name, e.g. "Spring Brake Chambers"', validation: (r) => r.required() }),
    defineField({
      name: 'path',
      title: 'Page Address',
      type: 'string',
      description: 'The page URL path, e.g. / or /spring-brake-chambers. Do not change.',
      readOnly: ({ document }) => Boolean(document?._createdAt),
      validation: (r) => r.required().regex(/^\//, { name: 'starts with /' }),
    }),
    defineField({ name: 'seo', title: 'SEO Settings', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'path' },
  },
})
