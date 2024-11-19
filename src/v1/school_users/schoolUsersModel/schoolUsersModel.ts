import mongoose from "mongoose";
import { IQuestion } from "../../question/questionModel/questionModel";
import { IUser } from "../../users/usersModel/userModel";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface ISchoolUser extends Document {
  // _id: mongoose.Schema.Types.ObjectId,
 user_id: mongoose.Schema.Types.ObjectId | IUser;
 school_id: mongoose.Schema.Types.ObjectId | ISchool;
}

const SchoolUsersSchema = new Schema<ISchoolUser>({
  // _id: mongoose.Schema.Types.ObjectId,
  user_id: { type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  school_id: { type:mongoose.Schema.Types.ObjectId, ref: 'Schools', required: true },
});

export const schoolsUser = mongoose.model<ISchoolUser>("SchoolUsers", SchoolUsersSchema);

// module.exports = schoolsUser;