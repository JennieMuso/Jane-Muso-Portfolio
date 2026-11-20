# Muso Designs

Jane Muso's portfolio, built with Astro and Phosphor icons.

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

The Home, Services, Contact, blog, shop, and Work content is edited in the Muso Designs Sanity Studio. The site reads published documents from project `lpyuxxi7`, dataset `production`, when it builds. A new Cloudflare Pages build is needed after publishing an edit. The import scripts in `scripts/` are for initial migration and skip documents already in Sanity.

To automate content updates, create a **Cloudflare Pages Deploy Hook** for the `main` branch, then add its URL as a **Sanity webhook** for the `production` dataset. Choose Create, Update, and Delete; leave Drafts and Versions off. Use this filter (the document types used by this site):

```groq
_type in ["article", "product", "project", "homePage", "workPage", "shopPage", "servicePage", "contactPage"]
```

Use `POST`, leave the projection and webhook secret empty for a direct Deploy Hook, and keep the hook URL private. Publish a small edit and check both Sanity's delivery log and Cloudflare's deployment log. The reusable skill is in [.agents/skills/sanity-cloudflare-connect/SKILL.md](.agents/skills/sanity-cloudflare-connect/SKILL.md), with a [step-by-step dashboard and secrets guide](.agents/skills/sanity-cloudflare-connect/references/setup-guide.md). The webhook is not configured by this repository alone; it must be added in the two dashboards.

The Work page lists every published project. The Home page can select and order up to four featured projects. Each project may also have an optional MP4 or WebM hero video; its required hero image is used as the poster and as the fallback when no video is uploaded. Video playback loops silently and can be paused by visitors.
