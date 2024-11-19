import { Request, Response } from "express";
import { lomba } from "../lombaModel/lombaModel";
export const EditLomba = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;
    const newLomba = await lomba.findByIdAndUpdate(
      id,
      {
        name,
        type,
      },
      { new: true }
    );

    const getLomba = await lomba.find();

    res.status(200).json(getLomba);
  } catch (err) {
    console.log(err);
  }
};
