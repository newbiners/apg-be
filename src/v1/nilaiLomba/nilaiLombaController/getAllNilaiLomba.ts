import { Request, Response } from "express";
import { nilaiLomba } from "../nilaiLombaModel/nilaiLombaModel";
import { schoolData } from "./postNilaiLombal";
import { regu } from "../../regu/reguModel/reguModel";
import { lomba } from "../../lomba/lombaModel/lombaModel";
export const getAllNilaiLomba = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { school, regu } = req.body;
    const getNilaiLomba = await nilaiLomba.find({
      school: school._id,
      regu: regu._id,
    });

    var data_school = await schoolData(getNilaiLomba[0].school);
    var data_regu = await reguData(getNilaiLomba[0].regu);
    var lomba_id = getNilaiLomba.map((item: any) => item.lomba);
    var data_lomba = await lombaData(lomba_id);

    var newNilaiData = getNilaiLomba.map((item: any) => {
      item.school = data_school;
      item.regu = data_regu;
      item.lomba = data_lomba[item.lomba.toString()];
      return item;
    });

    res.status(200).json(newNilaiData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const reguData = async (id: any) => {
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
