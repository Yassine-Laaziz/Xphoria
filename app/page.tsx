import axios from 'axios'
import HeroBanner from '../components/HeroBanner'
import { fetchData } from '../lib/sanity'
import Products from '../components/Products'
import ReviewModel from '../models/Reviews'
import { connect } from '../lib/mongodb'
import { sortedReviews, Review } from '../types'

export default async function Page() {
  const products = (await fetchData('*[_type == "product"]', true)) || []

  // product reviews
  await connect()
  const unsortedReviews: Review[] = await ReviewModel.find()
  const reviews: sortedReviews = {}
  unsortedReviews.forEach(review => {
    if (!reviews[review.product]) {
      reviews[review.product] = []
    }
    reviews[review.product].push(review)
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
