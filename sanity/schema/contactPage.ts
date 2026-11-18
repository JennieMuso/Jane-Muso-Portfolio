import { defineArrayMember, defineField, defineType } from 'sanity';

export const contactPageSchema = defineType({
  name: 'contactPage', title: 'Contact page', type: 'document', fields: [
    defineField({ name: 'faqHeading', title: 'FAQ heading', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'faqIntro', title: 'FAQ introduction', type: 'string' }),
    defineField({ name: 'faqs', title: 'Contact questions', type: 'array', of: [defineArrayMember({ type: 'object', fields: [
      defineField({ name: 'question', type: 'string', validation: (Rule) => Rule.required() }),
      defineField({ name: 'answer', type: 'text', rows: 3, validation: (Rule) => Rule.required() })
    ], preview: { select: { title: 'question' } } })], validation: (Rule) => Rule.required().min(1) })
  ], preview: { prepare: () => ({ title: 'Contact page' }) }
});
