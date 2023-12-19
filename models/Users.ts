import { Schema, model, models } from 'mongoose'

const CartItemSchema = new Schema({
  productID: { type: String, required: true },
  qty: { type: Number, required: true },
  chosenOptions: {
    type: {
      size: { type: String, required: true },
      color: { type: String, required: true },
      colorName: { type: String, required: true },
      mainImage: { type: String, required: true },
    },
    required: true,
  },
})

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  img: { type: String },
  cart: { type: [CartItemSchema], default: [] },
})

const UserModel = models.user || model('user', UserSchema)

export default UserModel
