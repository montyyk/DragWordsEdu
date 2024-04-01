import mongoose, { Document, Schema } from "mongoose";

export interface IWord extends Document {
  text: string;
  category: string;
}

export interface IGame extends Document {
  name: string;
  categories: string[]; // List of category names
  words: IWord[]; // Each word associated with a category
  createdBy: mongoose.Schema.Types.ObjectId;
}

const WordSchema: Schema = new Schema({
  text: { type: String, required: true },
  category: { type: String, required: true },
});

const GameSchema: Schema = new Schema({
  name: { type: String, required: true },
  categories: [{ type: String, required: true }],
  words: [WordSchema], // An array of WordSchema
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IGame>("Game", GameSchema);
