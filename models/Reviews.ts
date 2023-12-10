import { ObjectId } from 'mongodb'
import { Schema, model, models } from 'mongoose'

const ReviewSchema = new Schema({
  productID: { type: String, required: true },
  userID: { type: ObjectId, required: true },
  userImg: { type: String },
  username: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
})

const ReviewModel = models.review || model('review', ReviewSchema)

export default ReviewModel
