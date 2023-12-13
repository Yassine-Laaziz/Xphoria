'use server'

import { connect } from '../mongodb'
import { err } from '../constants'
import { Review } from '../../types'
import { getDatabaseUser } from './getUser'
import PurchaseModel from '../../models/Purchases'
import ReviewModel from '../../models/Reviews'

type ReturnT = {
  msg?: string
  redirect?: string
  newReview?: Review
}

export default async function sendReview(comment: string, rating: number, productID: string): Promise<ReturnT> {
  if (!comment) return { msg: 'please comment first' }
  if (!rating) return { msg: 'please rate the product first' }

  if (comment.split('').length > 200 || rating > 5 || rating < 1) {
    return { msg: err }
  }

  try {
    await connect()

    const user = await getDatabaseUser()
    if (!user) return { redirect: '/Auth' }
    const { _id, username, img } = user

    // verification
    const hasBoughtProduct = await PurchaseModel.find({ userID: _id, productID })
    if (!hasBoughtProduct) return { msg: 'You need to try the product before reviewing it' }
    const hasReviewedProduct = await ReviewModel.find({ userID: _id, productID })
    if (hasReviewedProduct) return { msg: err }

    // update
    const newReview = { username, comment, rating, productID, userID: _id, userImg: img || '' }
    await ReviewModel.create({ newReview })

    return { newReview }
  } catch (e) {
    return { msg: err }
  }
}
