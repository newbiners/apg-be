import mongoose from "mongoose";
import { IRoles } from "../../roles/rolesModel/rolesModel";
import { ILomba } from "../../lomba/lombaModel/lombaModel";
const Schema = mongoose.Schema;

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  lomba: mongoose.Schema.Types.ObjectId | ILomba;
  role: mongoose.Schema.Types.ObjectId | IRoles;
  active: boolean;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: false },
  lomba: { type: mongoose.Schema.Types.ObjectId, ref: "Lomba", required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Roles", required: true },
  active: { type: Boolean, required: false, default: false },
});

export const User = mongoose.model<IUser>("User", UserSchema);

// module.exports = User;
