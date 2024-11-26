import mongoose, { Document, Schema } from "mongoose";
import { ILomba } from "../../lomba/lombaModel/lombaModel";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
import { IRegu } from "../../regu/reguModel/reguModel";
import { ILombaDetail } from "../../lombaDetail/lombaDetailModel/lombaDetailModel";
import { IUser } from "../../users/usersModel/userModel";
import { INilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
import { INilaiLombaDetail } from "../../nilaiLombaDetail/nilaiLombaDetailModel/nilaiLombaDetailModel";
export interface INilaiJuri extends Document {
  school: mongoose.Schema.Types.ObjectId | ISchool;
  regu: mongoose.Schema.Types.ObjectId | IRegu;
  lomba: mongoose.Schema.Types.ObjectId | ILomba;
  lomba_detail: mongoose.Schema.Types.ObjectId | ILombaDetail;
  nilai_lomba_detail_id: mongoose.Schema.Types.ObjectId | INilaiLombaDetail;
  nilai_lomba_id: mongoose.Schema.Types.ObjectId | INilaiLomba;
  create: mongoose.Schema.Types.ObjectId | IUser;
  nilai: number;
  type: string;
}

const NilaiJuriSchema = new Schema<INilaiJuri>({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schools",
    required: true,
  },
  type: { type: String, required: false },
  regu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Regu",
    required: true,
  },
  lomba: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lomba",
    required: true,
  },
  lomba_detail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LombaDetail",
    required: true,
  },
  nilai_lomba_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NilaiLomba",
    required: true,
  },
  nilai_lomba_detail_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NilaiLombaDetail",
    required: true,
  },
  create: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nilai: { type: Number, required: true },
});

export const nilaiJuri = mongoose.model<INilaiJuri>(
  "NilaiJuri",
  NilaiJuriSchema
);
