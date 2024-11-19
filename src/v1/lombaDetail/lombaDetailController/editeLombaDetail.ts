import { Request, Response } from "express";
import { lombaDetail } from "../lombaDetailModel/lombaDetailModel";
export const editeLombaDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { header, name} = req.body;
    const newLombaDetail = await lombaDetail.findByIdAndUpdate(
      id,
      {
        name,
        header,
      },
      { new: true }
    );

    const getLombaDetail = await lombaDetail.find({ header: header._id });

    res.status(200).json(getLombaDetail);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
