import HeroBanner from '../components/HeroBanner'
import { fetchProducts, urlFor } from '../lib/sanity'
import ReviewModel from '../models/Reviews'
import { connect } from '../lib/mongodb'
import { sortedReviews, Review, Product } from '../types'
import Products from '../components/Products'

export default async function Page() {
  // images retrieved from sanity are objects in default so we use the urlFor function to make them urls
  const res: DirectSanityProduct[] = await fetchProducts()
  const products: Product[] = res.map(product => ({
    ...product,
    image: urlFor(product.image).url(),
    noBgImages: product.noBgImages.map(noBgImage => ({
      ...noBgImage,
      images: noBgImage.images.map(image => urlFor(image).url()),
    })),
  }))

  // product reviews
  await connect()
  const unsortedReviews: Review[] = await ReviewModel.find()
  const reviews: sortedReviews = {}
  unsortedReviews.forEach(review => {
    if (!reviews[review.productSlug]) {
      reviews[review.productSlug] = []
    }
    reviews[review.productSlug].push(review)
  })

  return (
    <>
      <HeroBanner />
      <Products
        products={products}
        reviews={reviews}
      />
    </>
  )
}

// this differs from type "Product" by the image property being an object here
interface DirectSanityProduct {
  name: string
  slogan?: string
  price: number
  image: object
  noBgImages: {
    color: string
    colorName: string
    images: object[]
    sizes: number[]
  }[]
}
