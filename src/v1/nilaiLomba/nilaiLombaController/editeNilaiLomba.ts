import { Request, Response } from "express";
import { nilaiLomba } from "../nilaiLombaModel/nilaiLombaModel";
import { schoolData } from "./postNilaiLombal";
import { reguData } from "./getAllNilaiLomba";
import { lombaData } from "./getAllNilaiLomba";
export const editeNilaiLomba = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { school, regu, lomba, nilai = 0 } = req.body;
    const newLombaDetail = await nilaiLomba.findByIdAndUpdate(
      id,
      {
        school,
        regu,
        lomba,
        nilai,
      },
      { new: true }
    );

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
