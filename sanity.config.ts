import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schema } from './src/sanity/schemaTypes'
import { projectId, dataset } from './src/sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: typeof location !== 'undefined' 
        ? location.origin 
        : typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.brakechambers.com') : 'https://www.brakechambers.com',
    }),
  ],
})
