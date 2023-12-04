import mongoose from 'mongoose'

const connection: { isConnected: boolean } = { isConnected: false }

export async function connect() {
  if (connection.isConnected) return

  try {
    await mongoose.connect(process.env.MONGO_URI)
    connection.isConnected = true
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}
