import imageUrlBuilder from '@sanity/image-url'
import SanityClientConstructor from '@sanity/client'

export const fetchData = async (query: string, revalidate?: boolean) => {
  const urlEncodedQuery = encodeURIComponent(query)
  let response: any

  let req
  if (revalidate) {
    req = await fetch(`https://an49tws5.api.sanity.io/v2022-12-28/data/query/production?query=${urlEncodedQuery}`, {
      next: { revalidate: 600 },
    })
  } else {
    req = await fetch(`https://an49tws5.api.sanity.io/v2022-12-28/data/query/production?query=${urlEncodedQuery}`)
  }

  response = (await req?.json())?.result

  return response
}

export const autoClient = SanityClientConstructor({
  projectId: 'an49tws5',
  dataset: 'production',
  apiVersion: '2022-12-28',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const builder = imageUrlBuilder(autoClient)

export const urlFor = (sanitySrc: object) => builder.image(sanitySrc)

export async function fetchProducts(revalidate?: boolean) {
  const products = await fetchData('*[_type == "product"]', revalidate)
  if (Array.isArray(products)) return products
  else return []
}
