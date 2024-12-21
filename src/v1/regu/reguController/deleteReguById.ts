import { regu } from "../reguModel/reguModel";
import { Request, Response } from "express";
import { schoolData } from "./postRegu";
import { nilaiJuri } from "../../nilaiJuri/nilaiJuriModel/nilaiJuriModel";
import { nilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
import { nilaiLombaDetail } from "../../nilaiLombaDetail/nilaiLombaDetailModel/nilaiLombaDetailModel";
import { schools } from "../../schools/schoolsModel/schoolsModel";
export const DeleteRoles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const regus = await regu.findByIdAndDelete({ _id: id });


    await nilaiJuri.deleteMany({ regu: id })
    await nilaiLomba.deleteMany({ regu: id })
    await nilaiLombaDetail.deleteMany({ regu: id })


    const getRegu = await nilaiJuri.find({ school: regus?.school, type: "pangkalan" });

    var nilai = 0;
    for (let i = 0; i < getRegu.length; i++) {
      nilai += getRegu[i].nilai
    }

    await schools.findByIdAndUpdate(regus?.school, { nilai: nilai }, { new: true });

    const school_id = getRegu.map((data) => data.school);
    const getSchool = await schoolData(school_id);

    getRegu.forEach((data) => {
      data.school = getSchool[data.school.toString()];
    });
    const sortegetRegu = getRegu.sort((a: any, b: any) => b.nilai - a.nilai);
    res.status(200).json(sortegetRegu);
  } catch (err) {
    console.log(err);
  }
};
