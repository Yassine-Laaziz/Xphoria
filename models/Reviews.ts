import { Schema, model, models } from 'mongoose'

const ReviewSchema = new Schema({
  productSlug: { type: String, required: true },
  username: { type: String, required: true },
  userID: { type: String, required: true },
  img: { type: String, required: true },
  comment: { type: String, required: true },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
})

const ReviewModel = models.review || model('review', ReviewSchema)

export default ReviewModel
