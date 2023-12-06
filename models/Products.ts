import { Schema, model, models } from 'mongoose'
import { ObjectId } from 'mongodb'

const PurchaseSchema = new Schema({
  userID: { type: ObjectId, ref: 'User', required: true },
  purchaseDate: { type: Date, required: true, default: Date.now },
  quantity: { type: Number, required: true, default: 1 },
})

const ReviewSchema = new Schema({
  userID: { type: String, required: true },
  username: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
})

const ProductSchema = new Schema({
  name: { type: String, required: true },
  slogan: { type: String },
  price: { type: Number, required: true },
  image: { type: Object, required: true },
  noBgImages: [
    {
      color: { type: String, required: true },
      colorName: { type: String, required: true },
      images: [{ type: String, required: true }],
      sizes: [{ type: String, required: true }],
    },
  ],
  sanity_id: [{ type: String, required: true }],
  purchases: { type: [PurchaseSchema], default: [] },
  reviews: { type: [ReviewSchema], default: [] },
})

const ProductModel = models.product || model('product', ProductSchema)

export default ProductModel
