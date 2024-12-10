import mongoose, { Document, Schema } from "mongoose";
import { ILomba } from "../../lomba/lombaModel/lombaModel";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
import { IRegu } from "../../regu/reguModel/reguModel";
import { ILombaDetail } from "../../lombaDetail/lombaDetailModel/lombaDetailModel";
import { IUser } from "../../users/usersModel/userModel";
import { INilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
import { INilaiLombaDetail } from "../../nilaiLombaDetail/nilaiLombaDetailModel/nilaiLombaDetailModel";
export interface IJuaraUmum extends Document {
  name: mongoose.Schema.Types.ObjectId;
  nilai: number;
  gender: string;
  type: string;
}

const JuaraUmumSchema = new Schema<IJuaraUmum>({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  type: { type: String, required: true },
  gender: { type: String, required: false },
  nilai: { type: Number, required: true },
});

export const juaraUmum = mongoose.model<IJuaraUmum>(
  "JuaraUmum",
  JuaraUmumSchema
);
