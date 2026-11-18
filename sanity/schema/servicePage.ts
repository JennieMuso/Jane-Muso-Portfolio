import { defineArrayMember, defineField, defineType } from 'sanity';

const question = defineArrayMember({ type: 'object', fields: [
  defineField({ name: 'question', type: 'string', validation: (Rule) => Rule.required() }),
  defineField({ name: 'answer', type: 'text', rows: 3, validation: (Rule) => Rule.required() })
], preview: { select: { title: 'question' } } });

export const servicePageSchema = defineType({
  name: 'servicePage', title: 'Services page', type: 'document', fields: [
    defineField({ name: 'seoDescription', title: 'Search description', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroTitle', title: 'Main heading', description: 'Use a line break to control the layout.', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroIntro', title: 'Introduction', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'packages', title: 'Website packages', type: 'array', of: [defineArrayMember({ type: 'object', fields: [
      defineField({ name: 'id', title: 'Anchor ID', description: 'Keep launch, signature or experience so package links continue to work.', type: 'string', validation: (Rule) => Rule.required() }),
      defineField({ name: 'name', type: 'string', validation: (Rule) => Rule.required() }),
      defineField({ name: 'tagline', type: 'string' }),
      defineField({ name: 'priceAed', title: 'Starting price in AED', type: 'string' }),
      defineField({ name: 'priceUsd', title: 'Starting price in USD', type: 'string' }),
      defineField({ name: 'duration', title: 'Typical delivery', type: 'string' }),
      defineField({ name: 'pages', title: 'Unique pages', type: 'string' }),
      defineField({ name: 'audience', title: 'Who it is for', type: 'text', rows: 3 }),
      defineField({ name: 'image', title: 'Package image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Image description', type: 'string' })] }),
      defineField({ name: 'deliverables', title: 'What you receive', type: 'array', of: [defineArrayMember({ type: 'text', rows: 2 })] }),
      defineField({ name: 'benefit', title: 'The business benefit', type: 'text', rows: 3 })
    ], preview: { select: { title: 'name', media: 'image' } } })], validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: 'processTitle', title: 'Process heading', type: 'text', rows: 3 }),
    defineField({ name: 'processParagraphs', title: 'Process paragraphs', type: 'array', of: [defineArrayMember({ type: 'text', rows: 4 })] }),
    defineField({ name: 'addOnsIntro', title: 'Add-ons introduction', type: 'text', rows: 2 }),
    defineField({ name: 'addOns', title: 'Add-ons', type: 'array', of: [defineArrayMember({ type: 'object', fields: [
      defineField({ name: 'name', type: 'string', validation: (Rule) => Rule.required() }),
      defineField({ name: 'price', type: 'string' }),
      defineField({ name: 'note', type: 'string' })
    ], preview: { select: { title: 'name', subtitle: 'price' } } })] }),
    defineField({ name: 'careOptions', title: 'Ongoing care', type: 'array', of: [defineArrayMember({ type: 'object', fields: [
      defineField({ name: 'name', type: 'string' }), defineField({ name: 'price', type: 'string' }), defineField({ name: 'description', type: 'text', rows: 2 })
    ], preview: { select: { title: 'name', subtitle: 'price' } } })] }),
    defineField({ name: 'terms', title: 'Pricing terms', type: 'text', rows: 4 }),
    defineField({ name: 'scopeExclusions', title: 'What is outside the package scope?', type: 'text', rows: 4 }),
    defineField({ name: 'faqHeading', title: 'FAQ heading', type: 'string' }),
    defineField({ name: 'faqIntro', title: 'FAQ introduction', type: 'string' }),
    defineField({ name: 'faqs', title: 'Services questions', type: 'array', of: [question] })
  ], preview: { prepare: () => ({ title: 'Services page' }) }
});
