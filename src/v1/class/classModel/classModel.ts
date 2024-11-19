import mongoose from "mongoose";
import { IQuestion } from "../../question/questionModel/questionModel";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface IClass extends Document {
  // _id: mongoose.Schema.Types.ObjectId,
 teacher_id: Number,
 student_id: Number,
}

const ClassSchema = new Schema<IClass>({
  // _id: mongoose.Schema.Types.ObjectId,

  teacher_id: { type: Number, required: true },
  student_id: { type: Number, required: true },
});

const classModel = mongoose.model<IClass>("Class", ClassSchema);

module.exports = classModel;