'use server'

import { connect } from '../mongodb'
import UserModel from '../../models/Users'
import { CartItem, ProductOptions } from '../../types'
import { getUserByServer } from '../serverFunctions/getUser'
import cleanCart from '../utils/cleanCart'

type ReturnT = {
  redirect?: string
  cart?: CartItem[]
}

export default async function addToBag(productSlug: string, qty: number, chosenOptions: ProductOptions): Promise<ReturnT | undefined> {
  try {
    await connect()

    const user = await getUserByServer()
    if (!user) {
      return { redirect: '/auth/login' }
    }

    user.cart.push({ productSlug, qty, chosenOptions })
    const cart = await cleanCart(user.cart)

    await UserModel.findByIdAndUpdate(user.id, { cart })

    return { cart }
  } catch (e) {
    return
  }
}
