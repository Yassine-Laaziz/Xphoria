import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  img: { type: String },
})

const UserModel = models.user || model('user', UserSchema)

export default UserModel
