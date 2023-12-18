'use server'

import { hydrateCart } from './contollers/cart'
import { getDatabaseUser } from './getUser'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function pay(): Promise<{ success?: boolean; redirect?: string } | undefined> {
  try {
    const user = await getDatabaseUser()
    if (!user?.cart) return { redirect: '/Auth' }
    // user.cart is safe because of the sanitizng in "product.ts" and it comes from the server
    const cart = await hydrateCart(user.cart)

    const line_items = cart.map(cartItem => {
      const { name, slogan, price, options, chosenOptions, qty } = cartItem
      const images = options.find(opt => opt.color === chosenOptions.color)?.images
      return {
        price_data: {
          currency: 'usd',
          unit_amount: price * 100,
          product_data: { name, description: slogan, images },
        },
        quantity: qty,
      }
    })

    const session = await stripe.checkout.sessions.create({
      line_items,
      customer_email: user.email,
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/Success`,
      cancel_url: `${process.env.BASE_URL}`,
    })

    return { success: true, redirect: session.url }
  } catch (e) {
    return { success: false }
  }
}
