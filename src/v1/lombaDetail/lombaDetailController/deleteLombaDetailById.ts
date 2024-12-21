import { get } from "http";
import { lombaDetail } from "../lombaDetailModel/lombaDetailModel";
import { Request, Response } from "express";
import { nilaiJuri } from "../../nilaiJuri/nilaiJuriModel/nilaiJuriModel";
export const DeleteLombaDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const data = await lombaDetail.findByIdAndDelete({ _id: id });

    await nilaiJuri.deleteMany({ lomba_detail: data && data._id })

    const getLombaDetail = await lombaDetail.find({
      header: data && data.header,
    });

    res.status(200).json(getLombaDetail);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};
