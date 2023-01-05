import { notFound } from 'next/navigation'
import Image from "next/image"
import { client, urlFor } from "../../../lib/sanity"

export async function generateStaticParams() {
  let res = await client("*[_type == 'product']")

  if (!Array.isArray(res)) res = []
  return res.map((product) => ({
    slug: product.slug.current,
  }))
}

async function ProductPage({ params }: { params: { slug: string } }) {
  const res = await client(
    `*[_type == 'product' && slug.current == '${params.slug}'][0]`
  )
  const correctPage = res && !Array.isArray(res)
  if (!correctPage) notFound()

  return (
    <div>
      <div className="grid-col-2 lg:grid-cols-2">
        <div>
          <div className="relative h-64 w-64">
            <Image
              src={urlFor(res?.images[0]).url()}
              alt={`Green-Astronauts-${res.name}`}
              fill={true}
            />
          </div>
          <div className="flex gap-3 justify-center">
            {res.images?.map((img, i) => (
              <div
                key={`Green-Astronauts-ProductPageImage-${i}`}
                className="relative h-20 w-20 rounded-sm cursor-pointer"
              >
                <Image
                  src={urlFor(img).url()}
                  alt={`Green-Astronauts-ProductPageImage-${i}`}
                  fill={true}
                />
              </div>
            ))}
          </div>
        </div>
        <h2 className="text-white">{res.name}</h2>
      </div>
    </div>
  ) 
}

export default ProductPage
