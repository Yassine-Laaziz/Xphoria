import { Product } from './../types';
import imageUrlBuilder from "@sanity/image-url"

export const client = async (query: string) => {
  const urlEncodedQuery = encodeURIComponent(query)

  let response: Product[] | string
  try {
    const req = await fetch(
      `https://an49tws5.apicdn.sanity.io/v2022-12-28/data/query/production?query=${urlEncodedQuery}`,
      { next: { revalidate: 600 } } // 10 minutes
    )
    response = (await req?.json())?.result
  } catch (e) {
    response = "An error occured!"
  }

  return response
}

// const builder = imageUrlBuilder(client)

// export const urlFor = (source) => builder.image(source)
