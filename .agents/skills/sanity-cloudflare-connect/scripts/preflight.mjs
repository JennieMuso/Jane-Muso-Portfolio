#!/usr/bin/env node

const projectId = process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET;
const readToken = process.env.SANITY_READ_TOKEN;

if (!projectId || !dataset) {
  console.error('Set SANITY_PROJECT_ID and SANITY_DATASET before running the preflight.');
  process.exit(2);
}
if (!/^[a-z0-9-]+$/.test(projectId) || !/^[a-zA-Z0-9_-]+$/.test(dataset)) {
  console.error('Project ID or dataset contains unexpected characters. Check the Sanity settings.');
  process.exit(2);
}

async function check(label, url, headers = {}) {
  try {
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(15000) });
    if (response.ok) {
      console.log(`OK: ${label}`);
      return true;
    }
    console.error(`FAIL: ${label} returned HTTP ${response.status}.`);
    return false;
  } catch (error) {
    console.error(`FAIL: ${label}: ${error.cause?.code || error.name}. Check network access and the destination allowlist.`);
    return false;
  }
}

const query = encodeURIComponent('*[0]._id');
let ok = await check(
  `Sanity query for ${projectId}/${dataset}`,
  `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?query=${query}`,
  readToken ? { Authorization: `Bearer ${readToken}` } : {}
);

const cfToken = process.env.CLOUDFLARE_API_TOKEN;
const account = process.env.CLOUDFLARE_ACCOUNT_ID;
const pagesProject = process.env.CLOUDFLARE_PAGES_PROJECT;
if (cfToken && account && pagesProject) {
  ok = (await check(
    `Cloudflare Pages project ${pagesProject}`,
    `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(account)}/pages/projects/${encodeURIComponent(pagesProject)}`,
    { Authorization: `Bearer ${cfToken}` }
  )) && ok;
} else {
  console.log('SKIP: Cloudflare API check (set CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, and CLOUDFLARE_PAGES_PROJECT to enable it).');
}

if (ok) console.log('Preflight passed. Next: verify the build, Studio deployment, and webhook delivery.');
process.exitCode = ok ? 0 : 1;
