import { defineArrayMember, defineField, defineType } from 'sanity';

export const shopPageSchema = defineType({
  name: 'shopPage',
  title: 'Shop page',
  type: 'document',
  fields: [
    defineField({ name: 'faqIntro', title: 'FAQ introduction', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'faqs', title: 'Shop questions', type: 'array', of: [
      defineArrayMember({ type: 'object', fields: [
        defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (Rule) => Rule.required() })
      ], preview: { select: { title: 'question' } } })
    ], validation: (Rule) => Rule.required().min(1) })
  ],
  preview: { prepare: () => ({ title: 'Shop page' }) }
});
