import mongoose from 'mongoose'

const connection: { isConnected: boolean } = { isConnected: false }

export async function connect() {
  if (connection.isConnected) return
  mongoose.set('strictQuery', true)
  mongoose.set('bufferTimeoutMS', process.env.NODE_ENV ? 30000 : 15000)
  mongoose.connect(process.env.MONGO_URI)
  connection.isConnected = true
}
