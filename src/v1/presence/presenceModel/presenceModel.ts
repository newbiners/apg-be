import mongoose from "mongoose";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
import { IUser } from "../../users/usersModel/userModel";
const Schema = mongoose.Schema; 
const Document = mongoose.Document;

export interface IPresence extends Document {
  // _id: mongoose.Schema.Types.ObjectId,
 school_id : mongoose.Schema.Types.ObjectId | ISchool;
  user_id: mongoose.Schema.Types.ObjectId | IUser;
  status: string;
}

const PresenceSchema = new Schema<IPresence>({
  // _id: mongoose.Schema.Types.ObjectId,
  school_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Schools', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true },
});

export const presence = mongoose.model<IPresence>("Presence", PresenceSchema);

