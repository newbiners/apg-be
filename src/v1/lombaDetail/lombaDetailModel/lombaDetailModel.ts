import mongoose, { Document, Schema } from "mongoose";
import { ILomba } from "../../lomba/lombaModel/lombaModel";

export interface ILombaDetail extends Document {
  name: string;
  header: mongoose.Schema.Types.ObjectId | ILomba;
  nilai_max: number;
}

const LombaDetailSchema = new Schema<ILombaDetail>({
  name: { type: String, required: true },
  header: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lomba",
    required: true,
  },
  nilai_max: { type: Number, required: true },
});

export const lombaDetail = mongoose.model<ILombaDetail>(
  "LombaDetail",
  LombaDetailSchema
);
