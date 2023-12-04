// This configuration is used to for the Sanity Studio that’s mounted on the `\app\admin\[[...index]]\page.tsx` route
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

import { schema } from './lib/sanity/schema'

const projectId = process.env.NEXT_PUBLIC_PROJECTID || 'an49tws5'
const dataset = process.env.NEXT_PUBLIC_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION || '2023-12-07'
export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
