import mongoose, { Document, Schema } from "mongoose";
import { ILomba } from "../../lomba/lombaModel/lombaModel";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
import { IRegu } from "../../regu/reguModel/reguModel";

export interface INilaiLomba extends Document {
  school: mongoose.Schema.Types.ObjectId | ISchool;
  regu: mongoose.Schema.Types.ObjectId | IRegu;
  lomba: mongoose.Schema.Types.ObjectId | ILomba;
  nilai: number;
  type: string;
}

const NilaiLombaSchema = new Schema<INilaiLomba>({
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
  nilai: { type: 'number', required: true },
});

export const nilaiLomba = mongoose.model<INilaiLomba>(
  "NilaiLomba",
  NilaiLombaSchema
);
