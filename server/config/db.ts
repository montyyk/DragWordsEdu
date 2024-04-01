// Import mongoose module
import mongoose from "mongoose"

// MongoDB URI
// Replace 'your_mongodb_uri_here' with your actual MongoDB connection string
const MONGO_URI: string = process.env.MONGO_URI ?? ""

const connectDB = async () => {
  console.log("Connecting to database...", MONGO_URI)
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
    process.exit(1) // Exit process with failure
  }
}

export default connectDB
