import { Product } from '../types';
import imageUrlBuilder from "@sanity/image-url"
import SanityClientConstructor from '@sanity/client';

export const client = async (query: string, duration: number) => {
  const urlEncodedQuery = encodeURIComponent(query)

  let response: Product[] | string
  try {
    const req = await fetch(
      `https://an49tws5.api.sanity.io/v2022-12-28/data/query/production?query=${urlEncodedQuery}`,
      { next: { revalidate: duration } } // 10 minutes
    )
    response = (await req?.json())?.result
  } catch (e) {
    response = "An error occured!"
  }

  return response
}

export const autoClient = SanityClientConstructor({
  projectId: 'an49tws5',
  dataset: 'production',
  apiVersion: '2022-12-28',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: false,
})

const builder = imageUrlBuilder(autoClient)

export const urlFor = (sanitySrc: object) => builder.image(sanitySrc)
