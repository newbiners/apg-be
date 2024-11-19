import { Request, Response } from "express";
import { lombaDetail } from "../lombaDetailModel/lombaDetailModel";
export const getAllLombaDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const getLombaDetail = await lombaDetail.find({
      header: id,
    });

    res.status(200).json(getLombaDetail);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
