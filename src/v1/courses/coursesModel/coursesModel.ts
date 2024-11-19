import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface ICourses extends Document {
  // _id: mongoose.Schema.Types.ObjectId,
  description: string;
  course_name: string;
  class_id: Number;
}

const CourseSchema = new Schema<ICourses>({
  // _id: mongoose.Schema.Types.ObjectId,
  description: { type: String, required: true },
  course_name: { type: String, required: true },
  class_id: { type: Number, required: true },
});

export const courses = mongoose.model<ICourses>("Courses", CourseSchema);

// module.exports = courses;