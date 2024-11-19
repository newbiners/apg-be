import mongoose from "mongoose";
import { IPayment } from "../../payment/paymnetModel/paymentModel";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
import { IRoles } from "../../roles/rolesModel/rolesModel";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", UserSchema);

// module.exports = User;
