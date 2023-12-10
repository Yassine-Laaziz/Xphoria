'use server'

import { redirect } from 'next/navigation'
import { fetchData } from '../sanity'
import { urlForImage } from '../sanity'
import { getDatabaseUser } from '../serverFunctions/getUser'
import { Product } from '../../types'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function pay() {
  const user = await getDatabaseUser()
  if (!user?.cart) return redirect('/Auth')

  //   const allProducts: Product[] | null = await fetchData(`*[_type == "product"]`)
  //   if (!allProducts) return

  //   // we already know that user.cart is safe because of because of cleanning in "addToBag.ts"
  //   const line_items = user.cart.map(cartItem => {
  //     const productWithImage = allProducts.find(product => product.productID)
  //     return {
  //     price_data: {
  //       currency: 'usd',
  //       unit_amount: cartItem.price * 100,
  //       product_data: { name, description, images: [imageURL] },
  //     },
  //     quantity: 1,
  //   }}
  // })

  //   const session = await stripe.checkout.sessions.create({
  //     line_items,
  //     customer_email: user.email,
  //     mode: 'payment',
  //     success_url: `${process.env.URL}/Success`,
  //     cancel_url: `${process.env.URL}`,
  //   })
  //   redirect(session.url)
}
