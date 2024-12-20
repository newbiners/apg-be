import { Request, Response } from "express";
import { nilaiLombaDetail } from "../nilaiLombaDetailModel/nilaiLombaDetailModel";
import { lombaDataRes } from "./postNilaiLombal";
import { schoolData } from "./postNilaiLombal";
import { reguData } from "./getAllNilaiLombaDetail";
import { ILombaDetail } from "../../lombaDetail/lombaDetailModel/lombaDetailModel";
import { ISchool } from "../../schools/schoolsModel/schoolsModel";
import { IRegu } from "../../regu/reguModel/reguModel";
import { nilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
import { schools } from "../../schools/schoolsModel/schoolsModel";
import { regu } from "../../regu/reguModel/reguModel";

export const editNilaiLomba = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { header, lomba_detail, nilai = 0 } = req.body;

    // Update the specified nilaiLombaDetail document
    const updatedLombaDetail = await nilaiLombaDetail.findByIdAndUpdate(
      id,
      { header, lomba_detail, nilai },
      { new: true }
    );

    // Retrieve all details for the specific header
    const nilaiLombaDetails = await nilaiLombaDetail.find({ header: header._id });

    // Find the corresponding nilaiLomba document by header ID
    var newNilai = 0

    for(let i = 0; i < nilaiLombaDetails.length; i++) {
      newNilai += nilaiLombaDetails[i].nilai
    }
    // res.status(200).json(header);
    // if (newNilai) {

     const nilai_lomba = await nilaiLomba.findByIdAndUpdate(header._id, { nilai: newNilai }, { new: true });
     const pangkalan_nilai_lomba = await nilaiLomba.find({school: nilai_lomba?.school, type: "pangkalan"});
     const regu_nilai_lomba = await nilaiLomba.find({regu: nilai_lomba?.regu, type: "regu"});

     let nilaiPangkalan = 0;
     for (let pnl of pangkalan_nilai_lomba) {
       nilaiPangkalan += pnl.nilai;
     }

     let nilaiRegu = 0;
     for (let pnl of regu_nilai_lomba) {
       nilaiRegu += pnl.nilai;
     }

     await schools.findByIdAndUpdate(nilai_lomba?.school, { nilai: nilaiPangkalan }, { new: true });
     await regu.findByIdAndUpdate(nilai_lomba?.regu, {nilai : nilaiRegu}, {new : true})
     
    // }

    // Map and retrieve detailed information based on lomba_detail IDs
    const lombaDetailIds = nilaiLombaDetails.map((item) => item.lomba_detail);
    const lombaDetailsRes = await lombaDataRes(lombaDetailIds);
    const schoolDataRes = await schoolData(nilaiLombaDetails[0].school);
    const reguDataRes = await reguData(nilaiLombaDetails[0].regu);

    // Update each nilaiLombaDetail with enriched data
    nilaiLombaDetails.forEach((item) => {
      item.lomba_detail = lombaDetailsRes[item.lomba_detail.toString()] as ILombaDetail;
      item.school = schoolDataRes as ISchool;
      item.regu = reguDataRes as IRegu;
    });


    res.status(200).json(nilaiLombaDetails);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to edit nilaiLomba", details: err });
  }
};
