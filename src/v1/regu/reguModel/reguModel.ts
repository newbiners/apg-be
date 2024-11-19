import mongoose from "mongoose";
import { IQuestion } from "../../question/questionModel/questionModel";
import { IUser } from "../../users/usersModel/userModel";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface IRegu extends Document {
  name: String;
  gender: String;
  school: mongoose.Schema.Types.ObjectId | ISchool;
  nilai: number;
}

const ReguSchema = new Schema<IRegu>({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schools",
    required: true,
  },
  nilai: { type: Number, required: true },
});

export const regu = mongoose.model<IRegu>("Regu", ReguSchema);

// module.exports = schoolsUser;
