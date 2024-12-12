import { get } from "http";
import { nilaiLomba } from "../nilaiLombaModel/nilaiLombaModel";
import { Request, Response } from "express";
import { schoolData } from "./postNilaiLombal";
import { reguData } from "./getAllNilaiLomba";
import { lombaData } from "./getAllNilaiLomba";
import { nilaiLombaDetail } from "../../nilaiLombaDetail/nilaiLombaDetailModel/nilaiLombaDetailModel";
export const DeleteNilaiLomba = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    await nilaiLombaDetail.deleteMany({ header: id });
    const data = await nilaiLomba.findByIdAndDelete({ _id: id });

    const getNilaiLomba = await nilaiLomba.find({
      school: data && data.school,
      regu: data && data.regu,
    });

    if (getNilaiLomba.length == 0) {
      res.status(200).json([]);
    }


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
    res.status(400).json(err);
    console.log(err);
  }
};
