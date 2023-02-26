import mongoose from "mongoose"
const connection: { isConnected: boolean } = { isConnected: false }

export const connect = async () => {
  if (connection.isConnected) return
  mongoose.set('strictQuery', true)
  mongoose.connect(process.env.MONGO_URI)
  connection.isConnected = true
}
