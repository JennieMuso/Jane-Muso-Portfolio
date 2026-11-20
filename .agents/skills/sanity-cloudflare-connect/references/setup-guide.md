# Guided setup: Sanity, GitHub Actions, and Cloudflare Pages

Use this page when setting up a new site or helping a nontechnical owner connect an existing one. Dashboard labels can change; use the closest matching **Settings**, **API**, **Tokens**, or **Deploy hooks** page if a label has moved. Do not send a user to create a token until the project, dataset, and required role are known.

## Start here: what to collect

| Item | How to find it | Muso example | Secret? |
| --- | --- | --- | --- |
| Organization ID | In Sanity Manage, choose the organization and inspect its URL or **Settings → General**. | `ot6ot6ggd` | No |
| Project ID | In Sanity Manage, select the project; inspect the URL or **Settings → General / Project details**. | `lpyuxxi7` | No |
| Dataset name | In that project, open **Datasets**. Note the exact name and whether it is public or private. | `production` | No |
| Studio URL | Decide the Sanity hosted hostname. It appears after deployment. | `muso-designs-blog.sanity.studio` | No |
| GitHub repository and production branch | Open the repository, then **Settings → Branches** or its default branch indicator. | `JennieMuso/Jane-Muso-Portfolio`, `main` | No |
| Cloudflare Pages project | Cloudflare dashboard → **Workers & Pages → Pages → project**. | `musodesigns` | No |
| Build command and output directory | Project README or Cloudflare Pages build settings. | `npm run build`, `dist` | No |

The organization ID identifies who owns the project. The **project ID plus dataset** tell the site exactly where content lives. A public dataset does not need an API token for a read-only site build. The organization ID is not a substitute for a project ID.

## 1. Create the right Sanity API token

1. Sign in at [Sanity Manage](https://www.sanity.io/manage) with the account that can manage the organization/project.
2. Select the correct organization in the top-left switcher. Open **API → Tokens**. For a project token, select the project first and look under its **API → Tokens**. The organization token screen shown during the Muso setup has an **Add API token** button.
3. Select **Add API token** and enter a descriptive name, such as `Muso Studio deployment`. Prefer a short expiry if your rotation process supports it; record the expiry date. Choose permissions for the exact job:

   | Job | Permission to select | Where to store the token |
   | --- | --- | --- |
   | Deploy Sanity Studio from GitHub Actions | **Deploy Studios (all projects)** plus access to the intended project. The Muso setup used **Muso Design Site → Developer**. | GitHub Actions repository secret |
   | Import or update content with a script | Project-scoped write/editor access sufficient for documents and assets. Use a separate token when possible. | GitHub Actions secret for migration or local `.env` only while importing |
   | Build a site from a private dataset | Read/viewer access to the specific project. | Cloudflare Pages encrypted environment variable |
   | Read a public dataset at build time | No token. | Nowhere |
   | Sanity Context | Context role if that feature is needed. It is unrelated to a basic site connection. | Only the service running Context |

4. Click **Save token**. Copy the token immediately into the intended secret field; Sanity may not show its full value again. If you lose it, create a replacement and revoke the old one.
5. Do **not** paste the token into chat, a GitHub issue, a screenshot, a tracked file, or the Cloudflare *plain text* variable field. The token's name and selected roles are safe to discuss; its value is not.

For the existing Muso repository, `.github/workflows/deploy-sanity-studio.yml` and the one-time import workflows reference the GitHub secret `SANITY_ORGANIZATION_TOKEN`. That existing token needed both Studio deployment and project content permissions because it served both jobs. For a new project, use separate deployment and import tokens and separate secret names when practical.

### If a token is rejected

- A read-only token cannot upload assets or deploy Studio.
- **Context Viewer/Developer** does not grant Studio deployment or project write access.
- An organization token may still need the project listed under **Project access**.
- Verify the token belongs to the same organization/project as the IDs in the workflow.
- Check expiry and whether you copied the entire value. Do not print it to troubleshoot.

## 2. Store secrets safely

### Local development: `.env`

1. In the repository root, run `cp .env.example .env` if the example exists. The example contains **names and placeholders only**.
2. Open `.env` in an editor and fill in the project and dataset. Add `SANITY_WRITE_TOKEN=...` only when a local import needs it. For a private dataset, use a separate `SANITY_READ_TOKEN=...` only after confirming the site's code reads that variable; adding a variable alone does not connect it.
3. Check that `.gitignore` includes `.env` and `.env.*`, with only a placeholder `.env.example` allowed. Run `git check-ignore .env` and confirm it prints `.env`. Run `git status --short` and confirm `.env` is absent.
4. Astro reads `.env` during its build, but plain Node import scripts may not. For the Muso Services import on Node 24, run `node --env-file=.env scripts/import-services-and-faqs.mjs`; adapt the script path for other imports. Alternatively use a secure shell environment or GitHub Actions. Remove local write tokens after the migration if they are no longer needed. Never put real token values in `.env.example`.

For a new repo, add `.env` and `.env.*` to `.gitignore` **before** creating `.env`. A `.gitignore` rule cannot undo a file already committed. If `.env` was tracked, run `git rm --cached .env`, commit its removal, and **rotate every exposed secret**; deleting the file from the latest commit does not remove it from Git history. Avoid putting secrets directly into shell commands, which may appear in history or process listings. Prefer an editor or an interactive secret prompt.

### GitHub Actions

1. Open the repository on GitHub → **Settings → Secrets and variables → Actions**. If Settings is hidden, verify you have repository administration access.
2. Click **New repository secret**. Set **Name** to the exact name the workflow references, such as `SANITY_ORGANIZATION_TOKEN`, and paste the token into **Secret**. Click **Add secret**.
3. You can later update the value from the same page, but GitHub will not reveal the saved value. Do not put token values in **Variables**, workflow YAML, or a commit.
4. In workflow YAML, pass the secret only to the step that needs it, for example `SANITY_AUTH_TOKEN: ${{ secrets.SANITY_ORGANIZATION_TOKEN }}` for Studio deployment. Project ID and dataset are non-secret and can be normal variables.

### Cloudflare Pages

Open **Workers & Pages → your Pages project → Settings → Variables and Secrets / Environment variables**. Add `SANITY_PROJECT_ID` and `SANITY_DATASET` for the production build if the site reads them. If the dataset is private, add the read token as a **secret/encrypted** variable under the exact name expected by the site's code. Set values for Preview too if preview builds need them. Redeploy after changing build variables.

The Cloudflare **Deploy Hook URL is itself a secret**: anyone with it can trigger builds. Enter it directly in the Sanity webhook's URL field. Do not commit it, put it in `.env.example`, or share it in chat. If exposed, delete/rotate the hook and update the Sanity webhook.

## 3. Deploy Studio through GitHub Actions

1. Confirm the repository contains `sanity.config.ts`, the schema files, and a Studio deployment workflow. For Muso the workflow is `.github/workflows/deploy-sanity-studio.yml`; it deploys to `muso-designs-blog.sanity.studio` using the secret above.
2. Confirm the workflow's project ID, dataset, Studio hostname, and GitHub secret name match the values you collected. The Muso workflow sets `SANITY_STUDIO_PROJECT_ID=lpyuxxi7` and `SANITY_STUDIO_DATASET=production`.
3. On GitHub, open the repository → **Actions** → **Deploy Sanity Studio** → **Run workflow**. Select `main` (or the correct production branch) and click the green **Run workflow** button. If the button is absent, check Actions permissions and that the workflow exists on the selected branch.
4. Open the new run, then its **deploy** job. Wait for every step to finish green. If it fails, read the failing step; the job log should not reveal secret values.
5. Visit the Studio URL, sign in, and confirm the expected document types appear. Publish a harmless test edit and confirm the document is marked **Published**.

A push to `main` that changes the Studio config or schema also triggers this Muso workflow. **Import Existing Blog to Sanity**, **Import Existing Shop to Sanity**, **Import Existing Work to Sanity**, and **Import Existing Home Page to Sanity** are migration workflows. Run each only when migrating existing content or specifically instructed. They are not the normal way to publish a Studio edit. The Services/FAQs import is currently a local script, `npm run services:import`, with a write token; it is not listed as a GitHub workflow.

## 4. Connect the site and check one page

1. Confirm the build can query `https://<project-id>.api.sanity.io`. In a restricted development environment, add that hostname to allowed network destinations. Run the skill's `scripts/preflight.mjs` with the project ID and dataset set. In Node 24 environments behind a proxy, use `node --use-env-proxy`.
2. Build the website with its usual command. For Muso: `npm run build`. If Sanity content is loaded during a static build, the build runner needs API access. Visitors use `cdn.sanity.io` for Sanity hosted images.
3. Open the generated page and verify the test edit. If it is still old, confirm the site queries the **published** dataset and that the build ran *after* the publish.
4. Add a Sanity **API → CORS origin** for the exact website origin only if the visitor's browser calls Sanity directly. A static/server-side build does not need browser CORS.

## 5. Add automatic Cloudflare Pages rebuilds

The source of truth is **Sanity content → Sanity webhook → Cloudflare Pages Deploy Hook → new build → live site**. No Sanity API token is required to call a Cloudflare Deploy Hook.

### Create the Deploy Hook in Cloudflare

1. Sign in to Cloudflare, choose the correct account, and open **Workers & Pages → Pages → your project**.
2. Verify this Pages project is connected to the correct GitHub repository and that a normal `main` build succeeds. Check **Settings → Builds & deployments** for the production branch, build command, and output directory.
3. Under **Settings → Builds & deployments → Deploy hooks** (sometimes shown under **Settings → Builds**), click **Add deploy hook / Create hook**.
4. Name it `Sanity published content`, select the production branch (`main` for Muso), and create it. Copy the generated URL directly into the Sanity webhook form in the next section. Store it like a password.

### Create the webhook in Sanity

1. Open Sanity Manage → choose the **project** → **API → Webhooks → Create webhook**. Name it `Rebuild Cloudflare Pages`.
2. Paste the Cloudflare Deploy Hook URL into the webhook **URL** field. Select the same dataset the site builds from (`production` for Muso).
3. Under **Trigger on**, check **Create**, **Update**, and **Delete**. Delete also matters when an article/product is unpublished.
4. In **Filter**, paste only a GROQ expression, not `*[]`. For the Muso site:

   ```groq
   _type in ["article", "product", "project", "homePage", "workPage", "shopPage", "servicePage", "contactPage"]
   ```

   For another site, replace those names with its actual Sanity schema `_type` values. Leaving the filter blank rebuilds for every document change. If deletes/unpublishes do not deliver with the simple filter, use a `before()._type` fallback as described in the main skill and verify it with a test.

5. Leave **Projection** empty. Enable the webhook. Under **Advanced settings**, use **POST**. Leave **Trigger webhook when drafts are modified** and **Trigger webhook when versions are modified** unchecked. The shown default API version (`v2021-03-25` in the Muso setup) is fine for this simple filter; a newer supported version is also fine.
6. Leave the **Secret** field empty for a direct Cloudflare Deploy Hook. That field signs Sanity requests, but the direct Cloudflare hook does not verify the signature. The hook URL is the credential. If you need signature verification, use a Worker between Sanity and Cloudflare.
7. Click **Save**. Publish a small test edit. Check the webhook's **Deliveries / Attempts** for HTTP 2xx; then open the Cloudflare Pages project **Deployments** and watch a new build complete. Open the live page and confirm the edit. If the webhook succeeds but the build fails, fix the build log before declaring the connection complete.

Once this test passes, editors publish in Studio and wait for the Cloudflare build. They do **not** run a GitHub import workflow for each edit. Studio schema/code changes still deploy from GitHub.

## Safety and troubleshooting handoff

- Never ask the owner to send a token or hook URL in chat. Ask them to confirm only that the secret was saved and share **redacted** error text if something fails.
- If a user accidentally shares a token or hook URL, rotate it before continuing.
- If the Studio workflow says unauthorized, check the token's Deploy Studios permission and project access first.
- If a publish does not update the site, trace one link at a time: **Published? → Sanity delivery? → Cloudflare deployment? → successful build? → correct URL/cache?**
- A successful site build proves only that content was fetched at build time. It does not prove the webhook is connected. Confirm a second deployment appears after a Studio publish.

Official references: [Sanity webhooks](https://www.sanity.io/docs/content-lake/webhooks), [Cloudflare Pages Deploy Hooks](https://developers.cloudflare.com/pages/configuration/deploy-hooks/), [GitHub Actions secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions).
