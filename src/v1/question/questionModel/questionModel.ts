import mongoose from "mongoose";
import { IExamp } from "../../examp/exampModal/exampModel";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface IQuestion extends Document {
  // _id: mongoose.Schema.Types.ObjectId,
 exam_id : mongoose.Schema.Types.ObjectId | IExamp;
  question: string;
}

const QuestionSchema = new Schema<IQuestion>({
  // _id: mongoose.Schema.Types.ObjectId,
  exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Examp', required: true },
  question: { type: String, required: true },
});

export const question = mongoose.model<IQuestion>("Question", QuestionSchema);

