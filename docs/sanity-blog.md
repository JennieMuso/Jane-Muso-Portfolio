# Blog content in Sanity

The blog, its article pages, homepage article cards, and sitemap now read published article documents from Sanity at build time. Until a Sanity project is configured, they use the three existing records in `src/data/articles.ts`. Once `SANITY_PROJECT_ID` is set, Sanity becomes the source of truth for all four locations.

## Connect the project

1. Create or choose a Sanity project and a public dataset (usually `production`).
2. Copy `.env.example` to `.env`. Set `SANITY_PROJECT_ID` and `SANITY_STUDIO_PROJECT_ID` to the same project ID. Set both dataset variables to the same dataset name.
3. Add a Sanity API token with write access as `SANITY_WRITE_TOKEN` in your local `.env`. Do not put it in Git or Cloudflare Pages.
4. Run `npm run blog:import` once. This uploads the existing article images and creates the three blog documents. Existing documents are skipped, so rerunning the command will not overwrite edits made in Sanity.
5. Run `npm run studio` to edit at the local Studio URL. Publish changes in Studio. `npm run studio:build` creates a separate `studio-dist/` bundle for Studio hosting; it is not part of the Astro site.
6. Set `SANITY_PROJECT_ID` and `SANITY_DATASET` in Cloudflare Pages build variables and redeploy. The website is static, so publishing an article in Sanity needs a new site build. A Sanity webhook can trigger builds after the project is connected.

The Studio requires the `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` variables wherever it is built or hosted. The site build needs read access to published content. If the dataset is private, a separate read token and its configuration will be needed.

Keep the URL slug stable for an existing article unless you also add a redirect from the old URL. Cover images and image descriptions are required. Articles are ordered by `sortOrder`, then publication date.
