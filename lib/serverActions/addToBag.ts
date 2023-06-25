'use server'

import { connect } from '../mongodb'
import UserModel from '../../models/Users'
import { CartItem, Product, ProductOptions, User } from '../../types'
import { getUserByJWT } from '../serverFunctions/getUser'
import { fetchData } from '../sanity'

type ReturnT = {
  redirect?: string
  cart?: CartItem[]
}

export default async function addToBag(product: string, qty: number, chosenOptions: ProductOptions): Promise<ReturnT | undefined> {
  try {
    await connect()

    const userJWT = await getUserByJWT()
    const user: User | null = await UserModel.findById(userJWT?.id)
    if (!user) {
      return { redirect: '/auth/login' }
    }

    // clear the non-mutable MongoDB ObjectId
    const cart = user.cart.map(cartItem => {
      const { product, qty, chosenOptions } = cartItem
      return { product, qty, chosenOptions }
    })

    // Sanitization
    const allProducts: Product[] = await fetchData('*[_type == "product"]', true)
    if (!allProducts) return

    const matchingProduct = allProducts.find(p => p.name === product)
    if (!matchingProduct) return

    const matchingOptions = matchingProduct.noBgImages.find(
      opt => opt.color === chosenOptions.color && opt.sizes.includes(chosenOptions.size)
    )
    if (!matchingOptions) return

    // Check if a similar product with different options already exists in the cart
    const existingItemIndex = cart.findIndex(
      item => item.product === product && item.chosenOptions.color === chosenOptions.color && item.chosenOptions.size === chosenOptions.size
    )

    if (existingItemIndex !== -1) {
      // Update the quantity of the existing item
      cart[existingItemIndex].qty += qty
    } else {
      // No existing product with the same options, add a new item to the cart
      cart.push({ product, qty, chosenOptions })
    }

    await UserModel.findByIdAndUpdate(user.id, { cart })
    return { cart }
  } catch (e) {
    console.log(`e${e}`)
    return
  }
}
