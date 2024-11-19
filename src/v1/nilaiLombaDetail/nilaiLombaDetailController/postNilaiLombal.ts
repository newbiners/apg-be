import { Request, Response } from "express";
import { nilaiLombaDetail } from "../nilaiLombaDetailModel/nilaiLombaDetailModel";
import { schools } from "../../schools/schoolsModel/schoolsModel";
import { lombaDetail } from "../../lombaDetail/lombaDetailModel/lombaDetailModel";
import { reguData, lombaData } from "./getAllNilaiLombaDetail";
import { ILombaDetail } from "../../lombaDetail/lombaDetailModel/lombaDetailModel";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
import { IRegu } from "../../regu/reguModel/reguModel";
import { Document } from "mongoose";
import { get } from "mongoose";
export const postNilaiLombaDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { header, lomba_detail, school, regu, nilai = 0 } = req.body;
    const lombaDetailData = await lombaDetail.findById(lomba_detail._id);
    const newNilaiLombaDetail = new nilaiLombaDetail({
      header,
      lomba_detail,
      school,
      regu,
      nilai,
    });
    await newNilaiLombaDetail.save();

    const getNilaiLombaDetail = await nilaiLombaDetail.find({
      header: header._id,
    });

    var lomba_detail_id = getNilaiLombaDetail.map((item) => {
      return item.lomba_detail;
    });

    var lomba_detail_res = await lombaDataRes(lomba_detail_id);
    const school_data = await schoolData(school._id);
    const regu_data = await reguData(regu._id);

    getNilaiLombaDetail.forEach((item) => {
      item.lomba_detail = lomba_detail_res[
        item.lomba_detail.toString()
      ] as ILombaDetail;
      item.school = school_data as ISchool;
      item.regu = regu_data as IRegu;
    });

    res.status(200).json(getNilaiLombaDetail);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const schoolData = async (id: any) => {
  const school = await schools.findById(id);

  return school;
};

export const lombaDataRes = async (
  id: any
): Promise<Record<string, Document>> => {
  // Define the expected type for the items in `lomba_detail`
  const lomba_detail = (await lombaDetail.find({
    _id: { $in: id },
  })) as Document[];

  const data_result: Record<string, Document> = {};

  for (const item of lomba_detail) {
    if (item && item._id) {
      data_result[item._id.toString()] = item;
    }
  }

  return data_result;
};
