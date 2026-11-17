import { defineField, defineType } from 'sanity';

export const workPageSchema = defineType({
  name: 'workPage',
  title: 'Work page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page heading', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'endNote', title: 'Text below the projects', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'seoDescription', title: 'Search description', type: 'text', rows: 2 })
  ],
  preview: { select: { title: 'title' } }
});
