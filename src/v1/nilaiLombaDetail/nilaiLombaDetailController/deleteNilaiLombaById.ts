import { get } from "http";
import { nilaiLombaDetail } from "../nilaiLombaDetailModel/nilaiLombaDetailModel";
import { Request, Response } from "express";
import { lombaDataRes } from "./postNilaiLombal";
import { ILombaDetail } from "../../lombaDetail/lombaDetailModel/lombaDetailModel";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
import { IRegu } from "../../regu/reguModel/reguModel";
import { schoolData } from "./postNilaiLombal";
import { reguData } from "./getAllNilaiLombaDetail";
import { nilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
import { schools } from "../../schools/schoolsModel/schoolsModel";
import { regu } from "../../regu/reguModel/reguModel";
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

    var nilai = 0;
    for (let i = 0; i < getNilaiLombaDetail.length; i++) {
      nilai += getNilaiLombaDetail[i].nilai;
    }
    const nilai_lomba = await nilaiLomba.findByIdAndUpdate(
      data && data.header,
      { nilai: nilai },
      { new: true }
    );

    const pangkalan_nilai_lomba = await nilaiLomba.find({ school: nilai_lomba?.school, type: "pangkalan" });
    const regu_nilai_lomba = await nilaiLomba.find({ regu: nilai_lomba?.regu, type: "regu" });

    let nilaiPangkalan = 0;
    for (let pnl of pangkalan_nilai_lomba) {
      nilaiPangkalan += pnl.nilai;
    }

    let nilaiRegu = 0;
    for (let pnl of regu_nilai_lomba) {
      nilaiRegu += pnl.nilai;
    }

    await schools.findByIdAndUpdate(nilai_lomba?.school, { nilai: nilaiPangkalan }, { new: true });
    await regu.findByIdAndUpdate(nilai_lomba?.regu, { nilai: nilaiRegu }, { new: true })

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
