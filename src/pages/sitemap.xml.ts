import type { APIRoute } from 'astro';
import { getArticles } from '../lib/blog';
import { getProducts } from '../lib/shop';
import { getProjects } from '../lib/work';
import { contentUpdated, siteUrl } from '../data/seo';

const staticPaths = [
  { path: '/', lastmod: contentUpdated },
  { path: '/contact/', lastmod: contentUpdated },
  { path: '/work/' },
  { path: '/blog/' },
  { path: '/shop/' }
];

export const GET: APIRoute = async () => {
  const [articles, products, projects] = await Promise.all([getArticles(), getProducts(), getProjects()]);
  const paths = [...staticPaths, ...articles.map(({ slug }) => ({ path: `/blog/${slug}/` })), ...products.map(({ slug }) => ({ path: `/shop/${slug}/` })), ...projects.map(({ slug }) => ({ path: `/work/${slug}/` }))];
  const urls = paths.map(({ path, lastmod }) =>
    `  <url><loc>${new URL(path, siteUrl).href}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`
  ).join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
};
