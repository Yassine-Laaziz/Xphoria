import HeroBanner from '../components/HeroBanner'
import ReviewModel from '../models/Reviews'
import { connect } from '../lib/mongodb'
import { sortedReviews, Review, Product } from '../types'
import Products from '../components/Products'
import { fetchData, urlForImage } from '../lib/sanity'

export default async function Page() {
  // images retrieved from sanity are objects in default so we use the urlForImage function to make them urls
  const res: DirectSanityProduct[] = await fetchData('*[_type == "product"]')
  const products: Product[] = res.map(product => ({
    ...product,
    image: urlForImage(product.image).url(),
    noBgImages: product.noBgImages.map(noBgImage => ({
      ...noBgImage,
      images: noBgImage.images.map(image => urlForImage(image).url()),
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
