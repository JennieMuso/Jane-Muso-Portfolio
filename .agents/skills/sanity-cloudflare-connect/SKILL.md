---
name: sanity-cloudflare-connect
description: Connect a website to Sanity Studio and published content, then trigger Cloudflare Pages builds automatically after relevant Sanity changes. Use for new integrations, migrations, or diagnosing stale content.
---

# Sanity + Cloudflare Pages connection

Use this checklist for a new project. Copy this skill directory into that repository's `.agents/skills/` folder, then invoke `sanity-cloudflare-connect`. First inspect the repository and current hosting setup; reuse what already works. Keep all credentials in the host's secret store, never in source, logs, screenshots, or chat.

**Start with the guided setup** in [references/setup-guide.md](references/setup-guide.md). Walk the user through the dashboard clicks and the safe handoffs before attempting a connection. Present one stage at a time when guiding a person through the UI. Show the known values, ask only for missing non-secret identifiers, and explain what each credential is for. Never ask the user to paste a token, GitHub secret, or Cloudflare Deploy Hook URL into chat. Let them enter secrets directly in the destination UI. After each handoff, resume work that is authorized and verify the next link in the chain. The guide separates Studio deployment, one-time content import, and ongoing content-triggered Pages builds.

## 1. Collect the facts before coding

Ask for only missing facts. Project ID is in Sanity project settings or the project URL; dataset is under **Datasets** (often `production`). Verify them separately from the organization ID. Record:

| Item | Where to find it / why it matters |
| --- | --- |
| Sanity project ID and dataset | Sanity project settings and Datasets. Both must match in Studio, site build, and webhook. |
| Public or private dataset | A public dataset can be read at build time without a token; a private one needs a narrowly scoped read token in Cloudflare build secrets. |
| Studio hostname | Choose the Sanity hosted subdomain before deployment. Confirm it is available. |
| Cloudflare account, Pages project, production branch | Cloudflare Pages dashboard. A Pages **Deploy Hook** requires a Git connected project and a branch. |
| Framework build command and output folder | For Astro static sites these are usually `npm run build` and `dist`. |
| Content types and initial content | Identify the exact Sanity `_type` values to query and trigger rebuilds for. |
| Network access | Build runner must reach `<project-id>.api.sanity.io`; visitors must be able to reach `cdn.sanity.io` for hosted images. |

Run `node .agents/skills/sanity-cloudflare-connect/scripts/preflight.mjs` from the target repository with `SANITY_PROJECT_ID` and `SANITY_DATASET` set. In a managed environment that uses an HTTP proxy, use Node 24's `node --use-env-proxy` flag. If needed, set `SANITY_READ_TOKEN` in the environment. The script verifies a Content Lake query and, if Cloudflare API variables are present, Pages project access. It never prints credentials. Do not use a write or organization token for a public read query.

## 2. Connect one content type end to end

1. Define the Sanity schema and a stable document ID or slug.
2. Configure Studio with the same project ID and dataset. Deploy Studio with a token permitted to deploy Studios. Verify the editor URL loads and the document type appears.
3. Query **published** content during the website build. Map images, references, and slugs explicitly. Handle missing fields and empty collections. Do not query drafts for production pages.
4. Migrate existing content with an idempotent script. Read before creating; never overwrite an editor's existing document on rerun. Use a project scoped write token only for the migration.
5. Build the site and inspect the output page. Publish one small edit in Studio, rebuild, and confirm the changed text appears. Only then expand to more types.

For browser side Sanity API calls, add the website origin under Sanity **API → CORS origins**. A server side static build does not require browser CORS; avoid adding broad origins unnecessarily.

## 3. Automate Cloudflare Pages after publishing

1. Confirm Cloudflare Pages already builds the Git production branch and has the same Sanity project/dataset environment variables. Run one normal Git deployment first.
2. In **Cloudflare Pages → Settings → Builds & deployments → Deploy hooks**, create a hook for the production branch. Treat its URL like a password. A hook triggers a complete Pages build.
3. In **Sanity project → API → Webhooks**, create an enabled webhook for the matching dataset. Set the URL to the Cloudflare Pages Deploy Hook URL, method `POST`, and actions **Create**, **Update**, **Delete**. Leave **Drafts** and **Versions** off so editing does not rebuild on every keystroke. Leave **Projection** empty; Cloudflare does not need a document payload. Use the current supported API version offered in the UI.
4. Filter to the document types used by the site. Paste a GROQ filter expression, not a full `*[]` query. Example: `_type in ["article", "product", "project", "homePage", "workPage", "shopPage", "servicePage", "contactPage"]`. Adjust the list to the target project. If deletion/unpublish events are missed, use `(_type in ["article", "product"] || before()._type in ["article", "product"])` with the project's types and verify a delete delivery.
5. For a direct Cloudflare Deploy Hook, leave Sanity's **Secret** blank: Cloudflare does not validate Sanity's signature at that endpoint. The unguessable Deploy Hook URL is the credential. To use signature verification, put a Worker in front, verify the Sanity signature there, and store the Deploy Hook URL as a Worker secret.
6. Publish a harmless content edit. Check **Sanity webhook delivery → HTTP 2xx**, then **Cloudflare Pages → new deployment**, then the live page. Test unpublish/delete too if those actions are part of the editorial workflow. Do not assume HTTP 2xx means the build succeeded.

Sanity Studio schema/code changes still need the normal Git deployment workflow. Content changes use the webhook. For static sites, each content change appears online only after the Cloudflare build completes; if immediate updates are required, choose runtime rendering or a live content API instead.

## 4. Diagnose from the first failing link

| Symptom | Check |
| --- | --- |
| Studio deploy fails | Token's Studio deploy permission, project access, hostname, Studio env vars, build logs. |
| Build cannot fetch Sanity | Project ID/dataset, dataset visibility or read token, network allowlist, API URL. |
| Studio publish succeeds but page stays old | Webhook delivery, filter/actions/drafts settings, Pages deployment logs, deployed branch, CDN/browser cache. |
| Images disappear | Sanity image asset URL mapping, public CDN access, image transformations, deleted asset references. |
| Browser CORS error | Add the exact browser origin in Sanity API CORS settings. Server builds do not use CORS. |
| Webhook requests succeed but no Pages build | Confirm the hook URL and branch; regenerate a leaked hook and replace it in Sanity. |

## Current Muso project example

Project `lpyuxxi7`, dataset `production`, Studio host `muso-designs-blog.sanity.studio`, Cloudflare Pages project `musodesigns`, branch `main`, build `npm run build`, output `dist`. The site currently fetches Sanity at build time. Its documented manual rebuild step can be replaced with the Deploy Hook webhook above. Do not assume that webhook exists until a publish test shows a new Pages deployment.

Official references: https://www.sanity.io/docs/content-lake/webhooks and https://developers.cloudflare.com/pages/configuration/deploy-hooks/
