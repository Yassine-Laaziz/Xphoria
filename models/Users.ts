import { Schema, model, models } from 'mongoose'

const CartItemSchema = new Schema({
  product: { type: String, required: true },
  qty: { type: Number, required: true },
  chosenOptions: {
    type: Object,
    // size: { type: Number, required: true },
    // color: { type: String, required: true },
    // colorName: { type: String, required: true },
    required: true,
  },
})

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  img: { type: String },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review', default: [] }],
  purchases: [{ type: Schema.Types.ObjectId, ref: 'Purchase', default: [] }],
  cart: { type: [CartItemSchema], default: [] },
})

const UserModel = models.user || model('user', UserSchema)

export default UserModel
