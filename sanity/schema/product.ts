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
    defineField({ name: 'coverImage', title: 'Cover image', description: 'Suggested: 1600 × 1200 px (4:3). Used on the shop card, product page hero, and next-product link. It crops into both tall and wide frames, so keep the main subject near the center.', type: 'image', options: { hotspot: true }, fields: [
      defineField({ name: 'alt', title: 'Image description', type: 'string', validation: (Rule) => Rule.required() })
    ], validation: (Rule) => Rule.required() }),
    defineField({ name: 'previewImage', title: 'Preview fallback image', description: 'Optional. Suggested: 1600 × 1200 px (4:3). Shown when the live preview is switched to an image; the cover image is used if this is empty. Keep key details centered for mobile cropping.', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'previewMode', title: 'Live preview mode', type: 'string', options: { list: [{ title: 'Embed live website', value: 'embed' }, { title: 'Show image', value: 'image' }] }, initialValue: 'embed' }),
    defineField({ name: 'previewUrl', title: 'Live preview URL', type: 'url', validation: (Rule) => Rule.required().uri({ scheme: ['https'] }) }),
    defineField({ name: 'checkoutUrl', title: 'Checkout URL', type: 'url', validation: (Rule) => Rule.required().uri({ scheme: ['https'] }) }),
    defineField({ name: 'framerUrl', title: 'Framer marketplace URL', type: 'url', validation: (Rule) => Rule.required().uri({ scheme: ['https'] }) }),
    defineField({ name: 'sortOrder', title: 'Display order', description: 'Lower numbers appear first.', type: 'number', initialValue: 100 })
  ],
  preview: { select: { title: 'name', subtitle: 'category', media: 'coverImage' } }
});
