import mongoose, { Document, Schema } from "mongoose"

export interface IActiveGame extends Document {
  pin: number // 4-digit PIN
  game: mongoose.Schema.Types.ObjectId // Reference to a Game
  createdAt: Date
}

const ActiveGameSchema: Schema = new Schema({
  pin: { type: Number, required: true, unique: true, min: 1000, max: 9999 },
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model<IActiveGame>("ActiveGame", ActiveGameSchema)
