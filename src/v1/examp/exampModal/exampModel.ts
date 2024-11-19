import mongoose, { Mongoose } from "mongoose";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
import { ITypeExamp } from "../../type_examp/typeExampModel/typeExampModel";
import { IUser } from "../../users/usersModel/userModel";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface IExamp extends Document {
  // _id: mongoose.Schema.Types.ObjectId,
 school_id : mongoose.Schema.Types.ObjectId | ISchool;
  user_teacher_id: mongoose.Schema.Types.ObjectId | IUser;
  user_student_id: mongoose.Schema.Types.ObjectId | IUser;
  type_examp_id: mongoose.Schema.Types.ObjectId | ITypeExamp;
}

const ExampSchema = new Schema<IExamp>({
  // _id: mongoose.Schema.Types.ObjectId,
  school_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Schools', required: true },
  user_teacher_id: { type: mongoose.Schema.Types.ObjectId , ref: 'User', required: true },
  user_student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type_examp_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeExamp', required: true },
});

export const Examp = mongoose.model<IExamp>("Examp", ExampSchema);

// module.exports = Exam;
