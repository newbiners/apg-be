import mongoose from "mongoose";
import { IRoles } from "../../roles/rolesModel/rolesModel";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  role: mongoose.Schema.Types.ObjectId | IRoles;
  active: boolean;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: false },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Roles", required: true },
  active: { type: Boolean, required: false, default: false },
});

export const User = mongoose.model<IUser>("User", UserSchema);

// module.exports = User;
