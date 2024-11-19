import mongoose from "mongoose";
import { IQuestion } from "../../question/questionModel/questionModel";
import { IUser } from "../../users/usersModel/userModel";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface IPayment extends Document {
  // _id: mongoose.Schema.Types.ObjectId,
 user_id: mongoose.Schema.Types.ObjectId | IUser;
 name_payment: string;
 nominal_payment: Number;
 payment_terbayar: Number;
 expred_paymnet: Number;
}

const PaymentSchema = new Schema<IPayment>({
  // _id: mongoose.Schema.Types.ObjectId,
  user_id: { type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name_payment: { type: String, required: true },
  nominal_payment: { type: Number, required: true },
  payment_terbayar: { type: Number, required: true },
  expred_paymnet: { type: Number, required: true },
});

const payment = mongoose.model<IPayment>("Payment", PaymentSchema);

module.exports = payment;