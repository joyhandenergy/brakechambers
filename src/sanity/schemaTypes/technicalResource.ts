import { defineType, defineField, defineArrayMember } from 'sanity'

export const technicalResource = defineType({
  name: 'technicalResource',
  title: 'Technical Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Specifications & Sizing', value: 'Specifications & Sizing' },
          { title: 'Installation & Maint.', value: 'Installation & Maint.' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageSrc',
      title: 'Image URL',
      type: 'url',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Ruler', value: 'Ruler' },
          { title: 'Shield Check', value: 'ShieldCheck' },
          { title: 'File Text', value: 'FileText' },
          { title: 'Wrench', value: 'Wrench' },
          { title: 'Shield Alert', value: 'ShieldAlert' },
        ],
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ 
          name: 'metaTitle', 
          title: 'Meta Title', 
          type: 'string',
          validation: (Rule) => Rule.max(60).warning('Longer titles may be truncated by search engines')
        }),
        defineField({ 
          name: 'metaDescription', 
          title: 'Meta Description', 
          type: 'text',
          validation: (Rule) => Rule.max(160).warning('Longer descriptions may be truncated by search engines')
        }),
        defineField({ name: 'keywords', title: 'Keywords', type: 'string' }),
      ]
    }),
    defineField({
      name: 'alert',
      title: 'Alert Box',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Alert Type',
          type: 'string',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Warning', value: 'warning' },
              { title: 'Danger', value: 'danger' },
            ]
          }
        }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'message', title: 'Message', type: 'text' }),
      ]
    }),
    defineField({
      name: 'download',
      title: 'Download Info',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'File Name', type: 'string' }),
        defineField({ name: 'size', title: 'File Size', type: 'string' }),
      ]
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'content', title: 'Content', type: 'text' }),
            defineField({
              name: 'bullets',
              title: 'Bullets',
              type: 'array',
              of: [{ type: 'string' }]
            }),
            defineField({
              name: 'steps',
              title: 'Steps',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({ name: 'title', title: 'Title', type: 'string' }),
                    defineField({ name: 'desc', title: 'Description', type: 'text' }),
                  ]
                })
              ]
            }),
            defineField({
              name: 'table',
              title: 'Table Data',
              type: 'object',
              fields: [
                defineField({
                  name: 'headers',
                  title: 'Headers',
                  type: 'array',
                  of: [{ type: 'string' }]
                }),
                defineField({
                  name: 'rows',
                  title: 'Rows',
                  type: 'array',
                  of: [
                    defineArrayMember({
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'cells',
                          title: 'Cells',
                          type: 'array',
                          of: [{ type: 'string' }]
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            defineField({
              name: 'faqs',
              title: 'FAQs',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({ name: 'question', title: 'Question', type: 'string' }),
                    defineField({ name: 'answer', title: 'Answer', type: 'text' }),
                  ]
                })
              ]
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
})
