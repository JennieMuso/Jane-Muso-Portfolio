import { createReadStream, existsSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { createClient } from '@sanity/client';
import { articles } from '../src/data/articles.ts';
import { projects } from '../src/data/projects.ts';
import { homeFaqs } from '../src/data/faqs.ts';

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
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, ...(alt ? { alt } : {}) };
}

if (await client.getDocument('home-page')) {
  console.log('Skipped existing Home page');
  process.exit(0);
}

const serviceContent = [
  {
    title: 'Web & app design',
    image: '/assets/service-web.jpg',
    paragraphs: [
      'A polished screen is only the beginning. I give your business a distinctive digital presence that expresses what makes it worth choosing, then carry that idea through every page and interaction.',
      'We start with your audience and the job the experience needs to do. From there, I shape the art direction, layout, typography, responsive screens, and the details that make the whole thing feel unmistakably yours.'
    ],
    audience: 'For clients who want a digital presence with a point of view.'
  },
  {
    title: 'UX design',
    image: '/assets/service-ux.jpg',
    paragraphs: [
      'People should not have to work to understand your website. I map what visitors need, organise the content around their questions, and make important actions easy to find.',
      'That means clearer navigation, stronger page flow, useful calls to action, and careful attention to mobile, accessibility, and the little moments where confidence is won or lost.'
    ],
    audience: 'For clients who need visitors to move from curiosity to action.'
  },
  {
    title: 'No-code building',
    image: '/assets/service-nocode.jpg',
    paragraphs: [
      'Some ideas need a fast, flexible route to launch. I use visual building tools when they fit the brief, turning the approved design into a working website without adding technical complexity you do not need.',
      'The result is considered from both sides: an experience your visitors can use and a site you can manage. The tool is chosen around the project, not the other way around.'
    ],
    audience: 'For clients who want to launch and keep moving.'
  },
  {
    title: 'Vibe coding',
    image: '/assets/service-code.jpg',
    paragraphs: [
      'When a project needs custom behaviour or more room to grow, I take it beyond a static mockup. I use Codex and Claude Code as development collaborators while keeping the concept, decisions, and quality bar firmly human-led.',
      'Depending on the brief, that can mean Astro or React for the experience, Cloudflare for hosting or infrastructure, Resend for email, and GitHub for versioned delivery. You get a thoughtful design and a practical build in one connected process.'
    ],
    audience: 'For clients who need something tailored, functional, and ready to evolve.'
  }
];

const services = [];
for (const [index, service] of serviceContent.entries()) {
  services.push({
    _type: 'object',
    _key: 'service-' + index,
    title: service.title,
    image: await uploadImage(service.image),
    paragraphs: service.paragraphs,
    audience: service.audience
  });
}

await client.create({
  _id: 'home-page',
  _type: 'homePage',
  seoDescription: 'Jennie Muso designs websites for service businesses in the UAE and Kenya. Explore Veyra Cargo, Bayline Legal, JIN Restaurant, and Nacre Dental.',
  heroMeta: ['Jennie Muso / digital designer & maker', 'Website design & development', 'Selected projects'],
  featuredProjects: projects.slice(0, 4).map((project, index) => ({ _type: 'reference', _key: 'project-' + index, _ref: 'project-' + project.slug })),
  galleryThesis: 'Design that looks closely.\nDevelopment that thinks ahead.',
  workflowTools: 'Tools in my workflow: Astro / Cloudflare / Resend / GitHub',
  servicesHeading: 'WHAT I MAKE\nPOSSIBLE',
  servicesIntro: 'Your website has to do more than impress for a second. It should help the right people understand you, trust you, and take the next step.',
  services,
  aboutPortrait: await uploadImage('/assets/jennie-portrait-preview.jpg', 'Portrait of Jennie Muso at a desk with a tablet'),
  aboutName: 'Jennie Muso',
  aboutRole: 'Founder & Designer',
  aboutStatement: 'I design with intention, bringing structure and expression together to make websites that speak clearly and feel unmistakably yours. I bring curiosity to every brief, making the complex feel clear, considered, and worth remembering.',
  aboutLinkUrl: 'https://www.linkedin.com/in/jane-muthoni-muchiri/',
  aboutLinkLabel: 'Learn more about me',
  insightsHeading: 'THINGS I’VE\nBEEN THINKING\nABOUT',
  insightsIntro: 'Notes on building digital experiences that look good, make sense, and do their job.',
  featuredArticles: articles.slice(0, 3).map((article, index) => ({ _type: 'reference', _key: 'article-' + index, _ref: 'article-' + article.slug })),
  shopHeading: 'GOOD THINGS\nTAKE SHAPE',
  shopIntro: 'Explore components, website templates, and coded sites made to help your next idea move.',
  faqHeading: 'GOOD QUESTIONS',
  faqIntro: 'A few things worth knowing before we begin.',
  faqs: homeFaqs.map((faq, index) => ({ _type: 'object', _key: 'faq-' + index, ...faq })),
  contactKicker: 'Have a project in mind?',
  contactHeading: 'LET’S MAKE\nSOMETHING\nMATTER',
  contactLinkLabel: 'Start a conversation'
});

console.log('Imported Home page');
