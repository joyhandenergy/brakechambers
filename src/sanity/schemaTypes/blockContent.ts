import React from 'react'
import { defineType, defineArrayMember, type BlockStyleProps } from 'sanity'

/**
 * Custom Quote component that avoids Sanity Studio's default <Text as="p"><div>
 * invalid DOM nesting in React 19.
 */
const QuoteStyle = (props: BlockStyleProps) =>
  React.createElement(
    'blockquote',
    {
      style: {
        borderLeft: '4px solid #f59e0b',
        paddingLeft: '1rem',
        margin: '0.75rem 0',
        fontStyle: 'italic',
        color: '#475569',
      },
    },
    props.children
  )

/**
 * Visual Rich Text Editor (Portable Text)
 * Allows non-developers and writers to format text, headings, bullet lists,
 * quotes, links, and images visually without touching HTML or writing code.
 */
export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        {
          title: 'Quote',
          value: 'blockquote',
          component: QuoteStyle,
        },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
        ],
        annotations: [
          {
            title: 'URL Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                    allowRelative: true,
                  }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
  ],
})
