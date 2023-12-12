import { notFound } from 'next/navigation'
import { getDisplayProduct } from '../../../../lib/serverFunctions/product'
import ProductPage from '../../../../components/ProductPage'

export default async function Stream({ params }: { params: { productID: string } }) {
  const product = await getDisplayProduct(params.productID)
  if (!product) notFound()

  return (
    <div className="mt-16">
      <ProductPage product={product} />;
    </div>
  )
}
