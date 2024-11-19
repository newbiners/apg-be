import mongoose from "mongoose";
import { IQuestion } from "../../question/questionModel/questionModel";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface IAnswer extends Document {
  // _id: mongoose.Schema.Types.ObjectId,
 question_id : mongoose.Schema.Types.ObjectId | IQuestion;
  status: string;
}

const AnswerSchema = new Schema<IAnswer>({
  // _id: mongoose.Schema.Types.ObjectId,
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  status: { type: String, required: true },
});

export const answer = mongoose.model<IAnswer>("Answer", AnswerSchema);

// module.exports = answer;
