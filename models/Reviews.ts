import { Schema, model, models } from 'mongoose'

const ReviewSchema = new Schema({
  product: String,
  username: String,
  userID: String,
  img: String,
  rating: Number,
  comment: String,
})

const ReviewModel = models.review || model('review', ReviewSchema)

export default ReviewModel
