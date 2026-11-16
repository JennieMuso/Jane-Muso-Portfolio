import { defineArrayMember, defineField, defineType } from 'sanity';

export const articleSchema = defineType({
  name: 'article',
  title: 'Blog article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'topic', title: 'Category', type: 'string', options: { list: ['User Experience', 'Tool', 'Strategy'] }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'excerpt', title: 'Summary', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'readTime', title: 'Reading time', type: 'string', initialValue: '5 min read', validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroImage', title: 'Cover image', type: 'image', options: { hotspot: true }, fields: [
      defineField({ name: 'alt', title: 'Image description', type: 'string', validation: (Rule) => Rule.required() })
    ], validation: (Rule) => Rule.required() }),
    defineField({ name: 'bodyImage', title: 'Image inside article', type: 'image', options: { hotspot: true }, fields: [
      defineField({ name: 'alt', title: 'Image description', type: 'string', validation: (Rule) => Rule.required() })
    ] }),
    defineField({ name: 'sections', title: 'Article sections', type: 'array', of: [
      defineArrayMember({ name: 'section', title: 'Section', type: 'object', fields: [
        defineField({ name: 'id', title: 'Anchor ID', type: 'slug', options: { source: (doc, context) => (context.parent as { heading?: string })?.heading || '' }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [defineArrayMember({ type: 'text', rows: 5 })], validation: (Rule) => Rule.required() })
      ], preview: { select: { title: 'heading' } } })
    ], validation: (Rule) => Rule.required() }),
    defineField({ name: 'references', title: 'Further reading links', type: 'array', of: [
      defineArrayMember({ type: 'object', fields: [
        defineField({ name: 'label', title: 'Link text', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required() })
      ], preview: { select: { title: 'label', subtitle: 'url' } } })
    ] }),
    defineField({ name: 'sortOrder', title: 'Display order', description: 'Lower numbers appear first.', type: 'number', initialValue: 100 }),
    defineField({ name: 'publishedAt', title: 'Publication date', type: 'datetime', initialValue: () => new Date().toISOString() })
  ],
  preview: { select: { title: 'title', subtitle: 'topic', media: 'heroImage' } }
});
