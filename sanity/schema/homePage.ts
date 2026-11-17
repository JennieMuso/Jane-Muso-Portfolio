import { defineArrayMember, defineField, defineType } from 'sanity';

export const homePageSchema = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({ name: 'seoDescription', title: 'Search description', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroMeta', title: 'Hero labels', description: 'Three short lines above the site name.', type: 'array', of: [defineArrayMember({ type: 'string' })], validation: (Rule) => Rule.required().length(3) }),
    defineField({ name: 'featuredProjects', title: 'Featured projects', description: 'Choose up to four projects. Drag to set their order.', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })], validation: (Rule) => Rule.max(4) }),
    defineField({ name: 'galleryThesis', title: 'Gallery statement', description: 'Use a line break between the two lines.', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: 'workflowTools', title: 'Tools line below the hero', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'servicesHeading', title: 'Services heading', description: 'Use a line break where the title should wrap.', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: 'servicesIntro', title: 'Services introduction', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'services', title: 'Services', type: 'array', of: [
      defineArrayMember({ type: 'object', fields: [
        defineField({ name: 'title', title: 'Service name', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'image', title: 'Service image', type: 'image', validation: (Rule) => Rule.required() }),
        defineField({ name: 'paragraphs', title: 'Description paragraphs', type: 'array', of: [defineArrayMember({ type: 'text', rows: 4 })], validation: (Rule) => Rule.required().min(1) }),
        defineField({ name: 'audience', title: 'Who this is for', type: 'string', validation: (Rule) => Rule.required() })
      ], preview: { select: { title: 'title', media: 'image' } } })
    ], validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: 'aboutPortrait', title: 'About portrait', type: 'image', options: { hotspot: true }, fields: [
      defineField({ name: 'alt', title: 'Image description', type: 'string', validation: (Rule) => Rule.required() })
    ], validation: (Rule) => Rule.required() }),
    defineField({ name: 'aboutName', title: 'About name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'aboutRole', title: 'About role', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'aboutStatement', title: 'About statement', type: 'text', rows: 5, validation: (Rule) => Rule.required() }),
    defineField({ name: 'aboutLinkUrl', title: 'About link URL', type: 'url', validation: (Rule) => Rule.required().uri({ scheme: ['https'] }) }),
    defineField({ name: 'aboutLinkLabel', title: 'About link text', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'insightsHeading', title: 'Insights heading', description: 'Use line breaks to control the title.', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'insightsIntro', title: 'Insights introduction', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: 'featuredArticles', title: 'Featured articles', description: 'Choose up to three articles. Drag to set their order.', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'article' }] })], validation: (Rule) => Rule.max(3) }),
    defineField({ name: 'shopHeading', title: 'Shop teaser heading', description: 'Use a line break where the title should wrap.', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: 'shopIntro', title: 'Shop teaser text', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: 'faqHeading', title: 'FAQ heading', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'faqIntro', title: 'FAQ introduction', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'faqs', title: 'Homepage questions', type: 'array', of: [
      defineArrayMember({ type: 'object', fields: [
        defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (Rule) => Rule.required() })
      ], preview: { select: { title: 'question' } } })
    ], validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: 'contactKicker', title: 'Contact introduction', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'contactHeading', title: 'Contact heading', description: 'Use line breaks to control the title.', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'contactLinkLabel', title: 'Contact link text', type: 'string', validation: (Rule) => Rule.required() })
  ],
  preview: { prepare: () => ({ title: 'Home page' }) }
});
