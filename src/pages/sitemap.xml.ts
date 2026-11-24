import type { APIRoute } from 'astro';
import { getArticles } from '../lib/blog';
import { getProducts } from '../lib/shop';
import { getProjects } from '../lib/work';
import { aeoContentUpdated, contentUpdated, siteUrl } from '../data/seo';

const staticPaths = [
  { path: '/', lastmod: contentUpdated },
  { path: '/contact/', lastmod: aeoContentUpdated },
  { path: '/services/', lastmod: '2026-11-18' },
  { path: '/work/', lastmod: aeoContentUpdated },
  { path: '/blog/', lastmod: aeoContentUpdated },
  { path: '/shop/' }
];

export const GET: APIRoute = async () => {
  const [articles, products, projects] = await Promise.all([getArticles(), getProducts(), getProjects()]);
  const lastmod = (date?: string) => date && /^\d{4}-\d{2}-\d{2}/.test(date) ? date.slice(0, 10) : undefined;
  const paths = [...staticPaths, ...articles.map(({ slug, modifiedAt }) => ({ path: `/blog/${slug}/`, lastmod: lastmod(modifiedAt) })), ...products.map(({ slug, modifiedAt }) => ({ path: `/shop/${slug}/`, lastmod: lastmod(modifiedAt) })), ...projects.map(({ slug, modifiedAt }) => ({ path: `/work/${slug}/`, lastmod: lastmod(modifiedAt) }))];
  const urls = paths.map(({ path, lastmod }) =>
    `  <url><loc>${new URL(path, siteUrl).href}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`
  ).join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
};
