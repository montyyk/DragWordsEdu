// models/User.ts
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

interface IUser extends mongoose.Document {
  username: string
  email: string
  password: string
  comparePassword: (enteredPassword: string) => Promise<boolean>
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model<IUser>("User", userSchema)

export default User
