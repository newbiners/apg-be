import { Request, Response } from "express";
import { lomba } from "../lombaModel/lombaModel";
export const GetAllLomba = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getLomba = await lomba.find();

    res.status(200).json(getLomba);
  } catch (err) {
    console.log(err);
  }
};
