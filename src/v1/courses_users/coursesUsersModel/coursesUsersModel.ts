import mongoose from "mongoose";
import { IQuestion } from "../../question/questionModel/questionModel";
import { IUser } from "../../users/usersModel/userModel";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
import { ICourses } from "../../courses/coursesModel/coursesModel";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface ICoursesUser extends Document {
  // _id: mongoose.Schema.Types.ObjectId,
 user_id: mongoose.Schema.Types.ObjectId | IUser;
 courses_id: mongoose.Schema.Types.ObjectId | ICourses;
 acumulate_grades: Number;
 average_grades: Number;
 semester: Number;
 tahun_ajaran: Number;
}

const CoursesUsersSchema = new Schema<ICoursesUser>({
  // _id: mongoose.Schema.Types.ObjectId,
  user_id: { type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courses_id: { type:mongoose.Schema.Types.ObjectId, ref: 'Courses', required: true },
  acumulate_grades: { type: Number, required: true },
  average_grades: { type: Number, required: true },
  semester: { type: Number, required: true },
  tahun_ajaran: { type: Number, required: true },
});

const coursesUser = mongoose.model<ICoursesUser>("coursesUsers", CoursesUsersSchema);

module.exports = coursesUser;