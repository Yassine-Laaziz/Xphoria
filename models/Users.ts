import { ObjectId } from 'mongodb'
import { Schema, model, models } from 'mongoose'

const PurchaseSchema = new Schema({
  productID: { type: ObjectId, ref: 'User', required: true },
  purchaseDate: { type: Date, required: true, default: Date.now },
  quantity: { type: Number, required: true, default: 1 },
})

const ReviewSchema = new Schema({
  productID: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
})

const CartItemSchema = new Schema({
  productID: { type: String, required: true },
  qty: { type: Number, required: true },
  chosenOptions: {
    type: {
      size: { type: String, required: true },
      color: { type: String, required: true },
      colorName: { type: String, required: true },
    },
    required: true,
  },
})

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  img: { type: String },
  reviews: [{ type: [PurchaseSchema], default: [] }],
  purchases: [{ type: [ReviewSchema], default: [] }],
  cart: { type: [CartItemSchema], default: [] },
})

const UserModel = models.user || model('user', UserSchema)

export default UserModel
