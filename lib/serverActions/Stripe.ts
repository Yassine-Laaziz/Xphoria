'use server'

import { redirect } from 'next/navigation'
import { getDatabaseUser } from '../serverFunctions/getUser'
import hydrateCart from '../serverFunctions/hydrateCart'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function pay() {
  try {
    const user = await getDatabaseUser()
    if (!user?.cart) return redirect('/Auth')
    // user.cart is safe because of the sanitizng in "addToBag.ts" and it comes from the server

    const cart = await hydrateCart(user.cart)

    const line_items = cart.map(cartItem => {
      const { name, image, slogan, price } = cartItem
      return {
        price_data: {
          currency: 'usd',
          unit_amount: price * 100,
          product_data: { name, description: slogan, image },
        },
        quantity: 1,
      }
    })

    console.log('reached')

    const session = await stripe.checkout.sessions.create({
      line_items,
      customer_email: user.email,
      mode: 'payment',
      success_url: `${process.env.URL}/Success`,
      cancel_url: `${process.env.URL}`,
    })
    redirect(session.url)
  } catch (e) {
    console.log(e)
  }
}
