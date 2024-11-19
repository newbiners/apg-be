import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface IRoles extends Document {
  // _id: mongoose.Schema.Types.ObjectId,
  name: string;
}

const RoleSchema = new Schema<IRoles>({
  // _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, maxlength: 20 },
});

export const roles = mongoose.model<IRoles>("Roles", RoleSchema);

// module.exports = roles;