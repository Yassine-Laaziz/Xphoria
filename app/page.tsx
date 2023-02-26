import HeroBanner from "../components/HeroBanner"
import { fetchData } from "../lib/sanity"
import Products from "../sections/products"

export default async function Page() {
  let products = await fetchData('*[_type == "product"]', true)
  let config = await fetchData('*[_type == "config"][0]', true)

  return (
    <>
      <HeroBanner config={config} />
      <Products products={products} />
    </>
  )
}
