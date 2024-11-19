import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface ITypeExamp extends Document {
  // _id: mongoose.Schema.Types.ObjectId,
  name : string;
  description: string;
}

const TypeExampSchema = new Schema<ITypeExamp>({
  // _id: mongoose.Schema.Types.ObjectId,
  name : {type : String, required: true},
  description: { type: String, required: true },
});

export const typeExamp = mongoose.model<ITypeExamp>("TypeExamp", TypeExampSchema);

// module.exports = typeExamp;
