'use server'

import { connect } from './mongodb'
type SendReviewReturnType = {
  success: boolean
  msg: string
  username?: string
  img?: string
}
export async function sendReview(comment: string, rating: number): Promise<SendReviewReturnType> {
  if (!comment || !rating) {
    return { success: false, msg: 'please make sure to write a comment and to rate the product' }
  }

  if (comment.split('').length > 300 || rating > 5 || rating < 1) {
    return { success: false, msg: 'Something went wrong, please try again later!' }
  }

  try {
    await connect()
  } catch (e) {
    console.log(e)
  }

  // check if user bought the product

  // check if

  return { success: true, msg: 'Reviewed Product Successfully!' }
}
