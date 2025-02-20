import { Request, Response } from "express";
import { nilaiLombaDetail } from "../nilaiLombaDetailModel/nilaiLombaDetailModel";
import { schoolData } from "./postNilaiLombal";
import { regu } from "../../regu/reguModel/reguModel";
import { lomba } from "../../lomba/lombaModel/lombaModel";
import { lombaDataRes } from "./postNilaiLombal";
import { ILombaDetail } from "../../lombaDetail/lombaDetailModel/lombaDetailModel";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
import { IRegu } from "../../regu/reguModel/reguModel";
export const getAllNilaiLombaDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const getNilaiLombaDetail = await nilaiLombaDetail.find({
      header: id,
    });


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
    console.log(err);
    res.status(400).json(err);
  }
};

export const reguData = async (id: any) => {
  // return id;
  const reguData = await regu.findById(id);

  return reguData;
};

export const lombaData = async (id: any) => {
  const lombaData = await lomba.find({
    _id: {
      $in: id,
    },
  });

  var data_result: Record<string, (typeof lombaData)[0]> = {};
  for (var i = 0; i < lombaData.length; i++) {
    data_result[lombaData[i]._id.toString()] = lombaData[i];
  }

  return data_result;
};
