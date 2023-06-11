import HeroBanner from '../components/HeroBanner'
import { fetchData } from '../lib/sanity'
import ReviewModel from '../models/Reviews'
import Products from '../sections/products'

export default async function Page() {
  const products = (await fetchData('*[_type == "product"]', true)) || []
  const reviews = await ReviewModel.find()

  return (
    <>
      <HeroBanner />
      <Products
        products={products}
        reviews={[
          { comment: "This stuff'z bussinngggg,", img: '', product: 'T-shirt', rating: 4.5, userID: 'AwdicfJ21498xAj', username: 'AYo' },
        ]}
      />
    </>
  )
}
