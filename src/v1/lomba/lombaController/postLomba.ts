import { Request, Response } from "express";
import { lomba } from "../lombaModel/lombaModel";
export const PostLomba = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, type } = req.body;
    const newLomba = new lomba({
      name,
      type,
    });
    await newLomba.save();

    const getLomba = await lomba.find();

    res.status(200).json(getLomba);
  } catch (err) {
    console.log(err);
  }
};
