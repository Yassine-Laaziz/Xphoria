import { notFound } from "next/navigation"
import { fetchData } from "../../../lib/sanity"
import { Product } from "../../../types"
import MultiSlide from "../../../sections/MultiSlide"

export async function generateStaticParams() {
  let res: Product[] = await fetchData("*[_type == 'product']", true)
  return res.map((product) => ({
    slug: product.slug.current,
  }))
}

async function ProductPage({ params }: { params: { slug: string } }) {
  const product: Product = await fetchData(
    `*[_type == 'product' && slug.current == '${params.slug}'][0]`,
    true
  )
  const correctPage = product && !Array.isArray(product)
  if (!correctPage) notFound()

  return <MultiSlide product={product} />
}

export default ProductPage
