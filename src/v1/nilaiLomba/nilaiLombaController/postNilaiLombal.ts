import { Request, Response } from "express";
import { nilaiLomba } from "../nilaiLombaModel/nilaiLombaModel";
import { schools } from "../../schools/schoolsModel/schoolsModel";
import { lomba as lombadb } from "../../lomba/lombaModel/lombaModel";
import { reguData, lombaData } from "./getAllNilaiLomba";
import { lombaDetail } from "../../lombaDetail/lombaDetailModel/lombaDetailModel";
import { get } from "mongoose";
export const postNilaiLomba = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { school, regu, lomba, nilai = 0 } = req.body;
    const dataLomba = await lombadb.findById(lomba._id);
    const newNilaiLomba = new nilaiLomba({
      school,
      regu,
      lomba,
      nilai,
      type: (dataLomba && dataLomba?.type) || "",
    });
    await newNilaiLomba.save();


    var data_lomba_detail = await lombaDetail.find({ header: lomba });
    res.status(200).json(data_lomba_detail);

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

export const schoolData = async (id: any) => {
  const school = await schools.findById(id);

  return school;
};
