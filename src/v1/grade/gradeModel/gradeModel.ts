import mongoose from "mongoose";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
import { IUser } from "../../users/usersModel/userModel";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface IGrade extends Document {
  // _id: mongoose.Schema.Types.ObjectId,
 grade_id : Number;
  user_id: mongoose.Schema.Types.ObjectId | IUser;
  courses_id: Number;
}

const GradeSchema = new Schema<IGrade>({
  // _id: mongoose.Schema.Types.ObjectId,
  grade_id: { type: Number, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courses_id: { type: Number, required: true },
});

const grade = mongoose.model<IGrade>("Grade", GradeSchema);

module.exports = grade;