'use server'

import UserModel from '../../models/Users'
import { CartItem, ProductOptions } from '../../types'
import { connect } from '../mongodb'
import { getUserByServer } from '../serverFunctions/getUser'

type ReturnT = {
  redirect?: string
  cart?: CartItem[]
}
export default async function removeFromBag(product: string, chosenOptions: ProductOptions): Promise<ReturnT | undefined> {
  try {
    await connect()

    const user = await getUserByServer()
    if (!user) {
      return { redirect: '/auth/login' }
    }
    const cart = user.cart

    // Find the index of the item to be removed
    const existingItemIndex = cart.findIndex(
      item =>
        item.productSlug === product && item.chosenOptions.color === chosenOptions.color && item.chosenOptions.size === chosenOptions.size
    )

    if (existingItemIndex !== -1) cart.splice(existingItemIndex, 1)
    // Removed the item from the cart

    await UserModel.findByIdAndUpdate(user.id, { cart })

    return { cart }
  } catch (e) {
    return
  }
}
