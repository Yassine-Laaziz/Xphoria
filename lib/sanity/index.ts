import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

// config
const projectId = process.env.NEXT_PUBLIC_PROJECTID || 'an49tws5'
const dataset = process.env.NEXT_PUBLIC_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION || '2023-12-07'

export const client = createClient({ projectId, dataset, apiVersion, useCdn: false })

const imageBuilder = createImageUrlBuilder({ dataset, projectId })
export const urlForImage = (source: object) => imageBuilder?.image(source).auto('format').fit('max')

export const fetchData = async (query: string) => {
  const urlEncodedQuery = encodeURIComponent(query)
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${urlEncodedQuery}`
  const req = await fetch(url, { next: { revalidate: 60, tags: ['sanity'] } })
  const response = (await req?.json())?.result

  return response
}
