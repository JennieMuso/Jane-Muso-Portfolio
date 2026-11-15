# Shop content model for Sanity

The shop currently reads published products from `src/data/products.ts`. The catalog card, category filter, and `/shop/[slug]/` page all use the same `Product` record. Replace that array with a Sanity query when the CMS is connected; keep the view components unchanged.

## Product document

| Field | Type | Required to publish | Used for |
| --- | --- | --- | --- |
| `slug` | slug | yes | Detail route |
| `name` | string | yes | Titles and cards |
| `category` | `component` or `template` | yes | Navigation filter |
| `summary` | text | yes | Cards, introduction, SEO description |
| `description` | array of text or Portable Text blocks | yes | Detail story |
| `features` | array of strings | yes | Detail list |
| `coverImage` / `coverAlt` | image and alt text | yes | Catalog artwork and social preview |
| `gallery` | array of images and alt text | no | Future detail media |
| `price` | string | yes | Price display and CTA |
| `framerUrl` | URL | yes | Marketplace source |
| `previewUrl` | URL | yes | Browser preview and full preview link |
| `checkoutUrl` | URL | yes | Lemon Squeezy purchase CTA |
| `visual` | optional presentation variant | no | Custom visual for featured products; generic cover is the default |

Only query documents with the required publication fields. This keeps preview and purchase buttons from pointing to incomplete records. Content, checkout, and preview URLs stay in Sanity; Astro generates static product routes from the query during its build.
