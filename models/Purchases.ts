import { Schema, model, models } from 'mongoose'
import { ObjectId } from 'mongodb'

const PurchaseSchema = new Schema({
  productID: { type: String, required: true },
  userID: { type: ObjectId, required: true },
  userImg: { type: String },
  username: { type: String, required: true },
  purchaseDate: { type: Date, required: true, default: Date.now },
  quantity: { type: Number, required: true, default: 1 },
})

const PurchaseModel = models.purchase || model('purchase', PurchaseSchema)

export default PurchaseModel
