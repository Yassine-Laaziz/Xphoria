import { ObjectId } from 'mongodb'
import { Schema, Types, model, models } from 'mongoose'
import { CartItem } from '../types'

// @ts-ignore because the mongoose schema types doesn't include the Cart prop
Types.CartItem = CartItem

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  img: { type: String },
  reviews: [{ type: ObjectId, ref: 'review', default: [] }],
  purchases: [{ type: ObjectId, ref: 'purchase', default: [] }],
  cart: { type: [CartItem], default: [] },
})

const UserModel = models.user || model('user', UserSchema)

export default UserModel
