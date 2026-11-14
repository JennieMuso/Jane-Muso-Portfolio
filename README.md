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
