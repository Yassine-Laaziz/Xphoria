'use server'

import { connect } from '../mongodb'
import UserModel from '../../models/Users'
import { CartItem, ProductOptions, SanityProduct } from '../../types'
import { getUserByServer } from '../serverFunctions/getUser'
import cleanCart from '../utils/cleanCart'
import { fetchData } from '../sanity'

type ReturnT = {
  redirect?: string
  cart?: CartItem[]
}

export default async function addToBag(_id: string, qty: number, chosenOptions: ProductOptions): Promise<ReturnT | undefined> {
  try {
    await connect()

    const user = await getUserByServer()
    if (!user) return { redirect: '/Auth' }
    const cart = [...user.cart]

    const allProducts: SanityProduct[] = await fetchData('*[_type == "product"]')
    if (!allProducts) return

    // Check if this is an actual product
    const matchingProduct = allProducts.find(p => p._id === _id)
    if (!matchingProduct) return

    // check if these are valid chosen options
    const matchingOptions = matchingProduct.noBgImages.find(
      opt => opt.color === chosenOptions.color && opt.sizes.find(size => size === chosenOptions.size)
    )
    if (!matchingOptions) return

    // Check if a similar product with similiar options already exists in the sanitized cart
    const existingItemIndex = cart.findIndex(
      item => item._id === _id && item.chosenOptions.color === chosenOptions.color && item.chosenOptions.size === chosenOptions.size
    )

    if (existingItemIndex !== -1) {
      // Update the quantity of the existing item
      cart[existingItemIndex].qty += qty
    } else {
      // No existing product with the same options, add a new item to the sanitized cart
      cart.push({ productID: _id, qty, chosenOptions })
    }

    await UserModel.findByIdAndUpdate(user._id, { cart })

    return { cart }
  } catch (e) {
    return
  }
}
