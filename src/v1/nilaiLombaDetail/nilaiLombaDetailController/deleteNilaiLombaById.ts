import { get } from "http";
import { nilaiLombaDetail } from "../nilaiLombaDetailModel/nilaiLombaDetailModel";
import { Request, Response } from "express";
import { lombaDataRes } from "./postNilaiLombal";
import { ILombaDetail } from "../../lombaDetail/lombaDetailModel/lombaDetailModel";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
import { IRegu } from "../../regu/reguModel/reguModel";
import { schoolData } from "./postNilaiLombal";
import { reguData } from "./getAllNilaiLombaDetail";
export const DeleteNilaiLombaDeta = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const data = await nilaiLombaDetail.findByIdAndDelete({ _id: id });

    const getNilaiLombaDetail = await nilaiLombaDetail.find({
      header: data && data.header,
    });

    if (getNilaiLombaDetail.length == 0) {
      res.status(200).json([]);
    }

    var lomba_detail_id = getNilaiLombaDetail.map((item) => {
      return item.lomba_detail;
    });

    var lomba_detail_res = await lombaDataRes(lomba_detail_id);
    const school_data = await schoolData(getNilaiLombaDetail[0].school);
    const regu_data = await reguData(getNilaiLombaDetail[0].regu);

    getNilaiLombaDetail.forEach((item) => {
      item.lomba_detail = lomba_detail_res[
        item.lomba_detail.toString()
      ] as ILombaDetail;
      item.school = school_data as ISchool;
      item.regu = regu_data as IRegu;
    });

    res.status(200).json(getNilaiLombaDetail);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};
