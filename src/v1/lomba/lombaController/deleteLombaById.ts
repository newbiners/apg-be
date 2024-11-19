import { lomba } from "../lombaModel/lombaModel";
import { Request, Response } from "express";
export const DeleteLomba = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    await lomba.findByIdAndDelete({ _id: id });

    const getLomba = await lomba.find();

    res.status(200).json(getLomba);
  } catch (err) {
    console.log(err);
  }
};
