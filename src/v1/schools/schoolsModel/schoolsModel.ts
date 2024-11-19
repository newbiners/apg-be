import mongoose from "mongoose";
import { IUser } from "../../users/usersModel/userModel";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface ISchool extends Document {
  // _id: mongoose.Schema.Types.ObjectId,
  name: String;
  address: String;
  phone_number: String;
  email: String;
  nilai: Number;
  createdAt: Date;
  updatedAt: Date;
  // user_id: mongoose.Types.ObjectId | IUser;
}

const SchoolSchema = new Schema<ISchool>({
  // _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  address: { type: String, required: false },
  phone_number: { type: String, required: false },
  email: { type: String, required: false },
  nilai: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const schools = mongoose.model<ISchool>("Schools", SchoolSchema);
