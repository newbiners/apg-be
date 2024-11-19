import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface ILomba extends Document {
  name: String;
  type: String;
}

const LombaSchema = new Schema<ILomba>({
  name: { type: String, required: true },
  type: { type: String, required: true },
});

export const lomba = mongoose.model<ILomba>("Lomba", LombaSchema);

// module.exports = schoolsUser;
