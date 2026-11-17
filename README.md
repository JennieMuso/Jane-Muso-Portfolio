# Muso Designs

Jennie Muso's portfolio, built with Astro and Phosphor icons.

## Local development

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Build the static site with `npm run build`. The output is in `dist/`.

## Cloudflare Pages

The intended Pages project is `musodesigns`, at `https://musodesigns.pages.dev`.

To connect this GitHub repository in Cloudflare Pages, use:

- Production branch: `main`
- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root

For a manual deployment after Cloudflare authentication, run `npm run deploy`.

## Sanity content

The Home page, blog articles, shop products, the Work page, and project case studies are edited in the Muso Designs Sanity Studio. The site reads published documents from project `lpyuxxi7`, dataset `production`, when it builds. After publishing an edit, rebuild the Cloudflare Pages site to show it online. The import scripts in `scripts/` are for initial migration and skip documents already in Sanity.
