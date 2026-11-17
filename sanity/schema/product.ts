import { defineArrayMember, defineField, defineType } from 'sanity';

export const productSchema = defineType({
  name: 'product',
  title: 'Shop product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: [{ title: 'Framer component', value: 'component' }, { title: 'Website template', value: 'template' }] }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'price', title: 'Price (USD)', description: 'Enter the amount without a dollar sign, for example 12 or 129.', type: 'number', validation: (Rule) => Rule.required().min(0) }),
    defineField({ name: 'summary', title: 'Short summary', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description paragraphs', type: 'array', of: [defineArrayMember({ type: 'text', rows: 4 })], validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: 'features', title: 'What you get', type: 'array', of: [defineArrayMember({ type: 'string' })], validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: 'coverImage', title: 'Cover image', type: 'image', options: { hotspot: true }, fields: [
      defineField({ name: 'alt', title: 'Image description', type: 'string', validation: (Rule) => Rule.required() })
    ], validation: (Rule) => Rule.required() }),
    defineField({ name: 'previewImage', title: 'Preview fallback image', description: 'Optional. The cover image is used when this is empty.', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'previewMode', title: 'Live preview mode', type: 'string', options: { list: [{ title: 'Embed live website', value: 'embed' }, { title: 'Show image', value: 'image' }] }, initialValue: 'embed' }),
    defineField({ name: 'previewUrl', title: 'Live preview URL', type: 'url', validation: (Rule) => Rule.required().uri({ scheme: ['https'] }) }),
    defineField({ name: 'checkoutUrl', title: 'Checkout URL', type: 'url', validation: (Rule) => Rule.required().uri({ scheme: ['https'] }) }),
    defineField({ name: 'framerUrl', title: 'Framer marketplace URL', type: 'url', validation: (Rule) => Rule.required().uri({ scheme: ['https'] }) }),
    defineField({ name: 'sortOrder', title: 'Display order', description: 'Lower numbers appear first.', type: 'number', initialValue: 100 })
  ],
  preview: { select: { title: 'name', subtitle: 'category', media: 'coverImage' } }
});
