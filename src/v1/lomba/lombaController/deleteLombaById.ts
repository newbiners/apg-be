import { lomba } from "../lombaModel/lombaModel";
import { Request, Response } from "express";
import { nilaiJuri } from "../../nilaiJuri/nilaiJuriModel/nilaiJuriModel";
export const DeleteLomba = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    await lomba.findByIdAndDelete({ _id: id });

    await nilaiJuri.deleteMany({ lomba: id })

    const getLomba = await lomba.find();

    res.status(200).json(getLomba);
  } catch (err) {
    console.log(err);
  }
};
