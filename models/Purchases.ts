import { ObjectId } from 'mongodb'
import { models, model, Schema } from 'mongoose'

const purchaseSchema = new Schema({
  user: { type: ObjectId, ref: 'User', required: true },
  product: { type: String, required: true },
  purchaseDate: { type: Date, required: true, default: Date.now },
  quantity: { type: Number, required: true, default: 1 },
})

const Purchase = models.review || model('purchase', purchaseSchema)

module.exports = Purchase
