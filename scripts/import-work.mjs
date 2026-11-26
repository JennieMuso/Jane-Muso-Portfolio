import { createReadStream, existsSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { createClient } from '@sanity/client';
import { projects, projectAsset } from '../src/data/projects.ts';

if (existsSync('.env')) process.loadEnvFile('.env');

const projectId = process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;
if (!projectId || !token) {
  throw new Error('Set SANITY_PROJECT_ID and SANITY_WRITE_TOKEN before importing.');
}

const client = createClient({ projectId, dataset, token, apiVersion: '2025-02-19', useCdn: false });

async function uploadImage(path, alt) {
  const file = resolve('public', path.replace(/^\//, ''));
  if (!existsSync(file)) throw new Error('Missing image: ' + file);
  const asset = await client.assets.upload('image', createReadStream(file), { filename: basename(file) });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt };
}

if (!(await client.getDocument('work-page'))) {
  await client.create({
    _id: 'work-page',
    _type: 'workPage',
    title: 'THE WORK.',
    intro: 'Four websites. Four very different businesses. Each one starts with the same question: what does this audience need to feel, understand, and do?',
    endNote: 'Four different briefs, each shaped around its audience. Select a project to explore the design, the build and the details behind it.',
    seoDescription: 'Selected websites by Jane Muso: Veyra Cargo, Bayline Legal, JIN Restaurant, and Nacre Dental.'
  });
  console.log('Imported Work page content');
}

for (const [index, project] of projects.entries()) {
  const id = 'project-' + project.slug;
  if (await client.getDocument(id)) {
    console.log('Skipped existing project: ' + project.slug);
    continue;
  }

  const document = {
    _id: id,
    _type: 'project',
    name: project.name,
    slug: { _type: 'slug', current: project.slug },
    eyebrow: project.eyebrow,
    liveUrl: project.liveUrl,
    showLivePreview: project.showLivePreview ?? true,
    intro: project.intro,
    story: project.story,
    designNote: project.designNote,
    detailCaption: project.detailCaption,
    secondaryCaption: project.secondaryCaption,
    accent: project.accent,
    canvas: project.canvas,
    disciplines: project.disciplines,
    stack: project.stack,
    heroImage: await uploadImage(projectAsset(project, 'hero'), project.heroAlt),
    desktopImage: await uploadImage(projectAsset(project, 'desktop'), project.name + ' website homepage shown in a desktop browser'),
    mobileImage: await uploadImage(projectAsset(project, 'mobile'), project.name + ' website homepage on a phone'),
    detailImage: await uploadImage(projectAsset(project, 'detail'), project.detailCaption),
    interiorImage: await uploadImage(projectAsset(project, 'interior'), project.name + ' interior page design'),
    secondaryImage: await uploadImage(projectAsset(project, 'secondary'), project.secondaryCaption),
    sortOrder: index + 1
  };

  await client.create(document);
  console.log('Imported: ' + project.name);
}
