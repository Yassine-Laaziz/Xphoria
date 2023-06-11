// import { notFound } from 'next/navigation'
// import { fetchData } from '../lib/sanity'
// import { Product } from '../types'
// import ProductModal from './ProductModal'

// async function ProductPage({ params }: { params: { slug: string } }) {
//   const product: Product = await fetchData(`*[_type == 'product' && slug.current == '${params.slug}'][0]`, true)
//   const correctProduct = product?.slug.current === params.slug
//   if (!correctProduct) notFound()

//   return <ProductModal product={product} />
// }

// export default ProductPage
