import { defineArrayMember, defineField, defineType } from 'sanity';

const imageField = (name: string, title: string, description: string) => defineField({
  name, title, description, type: 'image', options: { hotspot: true },
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
    imageField('heroImage', 'Hero poster and listing image', 'Suggested: 1920 × 1080 px (16:9). Used across the homepage, Work listing, and case study hero. It crops differently on mobile, so keep the subject near the center.'),
    defineField({ name: 'heroVideo', title: 'Hero video', description: 'Optional: 1920 × 1080 px (16:9) MP4 or WebM, compressed for the web. It loops silently on the case study. The hero image is its poster and fallback.', type: 'file', options: { accept: 'video/mp4,video/webm' } }),
    imageField('desktopImage', 'Desktop screenshot', 'Suggested: 1440 × 900 px (8:5). Shown inside the large browser frame; keep important content away from the edges.'),
    imageField('mobileImage', 'Mobile screenshot', 'Suggested: 780 × 1688 px (same shape as 390 × 844). Shown inside the tall phone frame.'),
    imageField('detailImage', 'Detail image', 'Suggested: 1600 × 1200 px (4:3). This large image fills a wide frame on desktop and a squarer frame on phones, so allow room for cropping.'),
    imageField('interiorImage', 'Interior page image', 'Suggested: 1440 × 900 px (8:5). Shown in the first image of the two-column detail gallery.'),
    imageField('secondaryImage', 'Secondary image', 'Suggested: 1200 × 1200 px (square). Shown in the second gallery slot, which crops close to square on desktop.'),
    defineField({ name: 'sortOrder', title: 'Display order', description: 'Lower numbers appear first.', type: 'number', initialValue: 100 })
  ],
  preview: { select: { title: 'name', subtitle: 'eyebrow', media: 'heroImage' } }
});
