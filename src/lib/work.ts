import { createClient } from '@sanity/client';
import type { Project, ProjectImageKind } from '../data/projects';

const projectId = import.meta.env.SANITY_PROJECT_ID || 'lpyuxxi7';
const dataset = import.meta.env.SANITY_DATASET || 'production';
const client = createClient({ projectId, dataset, apiVersion: '2025-02-19', useCdn: false });

type SanityImage = { alt?: string; asset?: { url?: string } };
type SanityProject = Omit<Project, 'heroAlt' | 'heroVideo' | 'images' | 'imageAlts'> & {
  heroVideo?: { asset?: { url?: string; mimeType?: string } };
  heroImage?: SanityImage;
  desktopImage?: SanityImage;
  mobileImage?: SanityImage;
  detailImage?: SanityImage;
  interiorImage?: SanityImage;
  secondaryImage?: SanityImage;
};

export type WorkPage = { title: string; intro: string; endNote: string; seoDescription: string };

let projectsPromise: Promise<Project[]> | undefined;
let workPagePromise: Promise<WorkPage> | undefined;

export function getProjects(): Promise<Project[]> {
  return projectsPromise ??= loadProjects();
}

export function getWorkPage(): Promise<WorkPage> {
  return workPagePromise ??= client.fetch<WorkPage>(
    `*[_id == "work-page"][0]{title, intro, endNote, seoDescription}`
  );
}

async function loadProjects(): Promise<Project[]> {
  const documents = await client.fetch<SanityProject[]>(
    `*[_type == "project" && defined(slug.current) && defined(heroImage.asset)] | order(sortOrder asc, name asc) {
      "slug": slug.current, "modifiedAt": _updatedAt, name, eyebrow, liveUrl, showLivePreview, intro, story, designNote,
      detailCaption, secondaryCaption, accent, canvas, disciplines, stack,
      heroImage { alt, asset->{url} }, heroVideo { asset->{url, mimeType} }, desktopImage { alt, asset->{url} },
      mobileImage { alt, asset->{url} }, detailImage { alt, asset->{url} },
      interiorImage { alt, asset->{url} }, secondaryImage { alt, asset->{url} }
    }`
  );

  const imageKinds: ProjectImageKind[] = ['hero', 'desktop', 'mobile', 'detail', 'interior', 'secondary'];
  return documents.map((document) => {
    const images: Project['images'] = {};
    const imageAlts: Project['imageAlts'] = {};
    for (const kind of imageKinds) {
      const image = document[`${kind}Image`];
      if (image?.asset?.url) images[kind] = image.asset.url;
      if (image?.alt) imageAlts[kind] = image.alt;
    }
    return {
      ...document,
      heroAlt: document.heroImage?.alt || '',
      heroVideo: document.heroVideo?.asset?.url ? { url: document.heroVideo.asset.url, mimeType: document.heroVideo.asset.mimeType } : undefined,
      story: document.story || [],
      disciplines: document.disciplines || [],
      stack: document.stack || [],
      images,
      imageAlts
    };
  });
}
