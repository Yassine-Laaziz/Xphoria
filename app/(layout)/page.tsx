import HeroBanner from '../../components/HeroBanner'
import Products from '../../components/Products'
import { connect } from '../../lib/mongodb'
import { DatabaseProduct, DisplayProduct, SanityProduct } from '../../types'
import { fetchData, urlForImage } from '../../lib/sanity'
import ProductModel from '../../models/Products'

export default async function Page() {
  const sanityProducts: SanityProduct[] | null = await fetchData('*[_type == "product"]')
  const products: DisplayProduct[] = []

  // SanityProduct[] ==> DisplayProduct[]
  if (sanityProducts && sanityProducts.length > 0) {
    await connect()
    const databaseProducts: DatabaseProduct[] = await ProductModel.find()

    sanityProducts.forEach(product => {
      const image = urlForImage(product.image).url()

      const noBgImages = product.noBgImages.map(noBgImg => ({
        ...noBgImg,
        images: noBgImg.images.map(img => urlForImage(img).url()),
      }))

      const dbProduct = databaseProducts.find(dbProduct => dbProduct.sanity_id === product._id)

      // Create a new product structure with reviews
      products.push({ ...product, image, noBgImages, reviews: dbProduct?.reviews })
    })
  }

  return (
    <>
      <HeroBanner />
      <Products products={products} />
    </>
  )
}
