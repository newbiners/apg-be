import mongoose, { Document, Schema } from "mongoose";
import { INilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
import { ILombaDetail } from "../../lombaDetail/lombaDetailModel/lombaDetailModel";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
import { IRegu } from "../../regu/reguModel/reguModel";
export interface INilaiLombaDetail extends Document {
  header: mongoose.Schema.Types.ObjectId | INilaiLomba;
  lomba_detail: mongoose.Schema.Types.ObjectId | ILombaDetail;
  school: mongoose.Schema.Types.ObjectId | ISchool;
  regu: mongoose.Schema.Types.ObjectId | IRegu;
  nilai: number;
}

const NilaiLombaDetailSchema = new Schema<INilaiLombaDetail>({
  header: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NilaiLomba",
    required: true,
  },
  lomba_detail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LombaDetail",
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schools",
    required: true,
  },
  regu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Regu",
    required: true,
  },
  nilai: { type: Number, required: true },
});

export const nilaiLombaDetail = mongoose.model<INilaiLombaDetail>(
  "NilaiLombaDetail",
  NilaiLombaDetailSchema
);
