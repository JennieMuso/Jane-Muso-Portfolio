import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { articleSchema } from './sanity/schema/article';
import { productSchema } from './sanity/schema/product';

export default defineConfig({
  name: 'muso-designs',
  title: 'Muso Designs',
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool()],
  schema: { types: [articleSchema, productSchema] }
});
