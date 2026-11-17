import { defineArrayMember, defineField, defineType } from 'sanity';

const imageField = (name: string, title: string) => defineField({
  name, title, type: 'image', options: { hotspot: true },
  fields: [defineField({ name: 'alt', title: 'Image description', type: 'string', validation: (Rule) => Rule.required() })],
  validation: (Rule) => Rule.required()
});

export const projectSchema = defineType({
  name: 'project',
  title: 'Work project',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Project name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'eyebrow', title: 'Project category and location', description: 'For example: Dining / Dubai', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'liveUrl', title: 'Live website URL', type: 'url', validation: (Rule) => Rule.required().uri({ scheme: ['https'] }) }),
    defineField({ name: 'intro', title: 'Opening statement', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: 'story', title: 'Project story', type: 'array', of: [defineArrayMember({ type: 'text', rows: 5 })], validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: 'designNote', title: 'Design note', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'detailCaption', title: 'Detail image caption', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'secondaryCaption', title: 'Secondary image caption', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'accent', title: 'Accent color', description: 'Six-digit hex color, such as #d6e869.', type: 'string', validation: (Rule) => Rule.required().regex(/^#[0-9a-fA-F]{6}$/) }),
    defineField({ name: 'canvas', title: 'Canvas color', description: 'Six-digit hex color, such as #dfe9e7.', type: 'string', validation: (Rule) => Rule.required().regex(/^#[0-9a-fA-F]{6}$/) }),
    defineField({ name: 'disciplines', title: 'Disciplines', type: 'array', of: [defineArrayMember({ type: 'string' })], validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: 'stack', title: 'Technology', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    imageField('heroImage', 'Hero and listing image'),
    imageField('desktopImage', 'Desktop screenshot'),
    imageField('mobileImage', 'Mobile screenshot'),
    imageField('detailImage', 'Detail image'),
    imageField('interiorImage', 'Interior page image'),
    imageField('secondaryImage', 'Secondary image'),
    defineField({ name: 'sortOrder', title: 'Display order', description: 'Lower numbers appear first.', type: 'number', initialValue: 100 })
  ],
  preview: { select: { title: 'name', subtitle: 'eyebrow', media: 'heroImage' } }
});
