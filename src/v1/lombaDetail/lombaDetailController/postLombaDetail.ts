import { Request, Response } from "express";
import { lombaDetail } from "../lombaDetailModel/lombaDetailModel";
export const postLombaDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { header, name, nilai_max } = req.body;
    const newLombaDetail = new lombaDetail({
      header,
      name,
      nilai_max
    });
    await newLombaDetail.save();

    const getLombaDetail = await lombaDetail.find({
      header: header._id,
    });

    res.status(200).json(getLombaDetail);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
