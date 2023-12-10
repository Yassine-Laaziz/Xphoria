import HeroBanner from '../../components/HeroBanner'
import Products from '../../components/Products'
import { getDisplayProducts } from '../../lib/serverFunctions/product'

export default async function Page() {
  const products = await getDisplayProducts()

  return (
    <>
      <HeroBanner />
      <Products products={products} />
    </>
  )
}
