import { schools } from "../schoolsModel/schoolsModel";
import { Request, Response } from "express";
import { nilaiJuri } from "../../nilaiJuri/nilaiJuriModel/nilaiJuriModel";
import { regu } from "../../regu/reguModel/reguModel";
import { nilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
import { nilaiLombaDetail } from "../../nilaiLombaDetail/nilaiLombaDetailModel/nilaiLombaDetailModel";
export const DeleteSchool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const deleteRoles = await schools.findByIdAndDelete({ _id: id });

    await nilaiJuri.deleteMany({ school: id })
    await regu.deleteMany({ school: id })
    await nilaiLomba.deleteMany({ school: id })
    await nilaiLombaDetail.deleteMany({ school: id })
    const getSchools = await schools.find();
    const sortegetSchools = getSchools.sort((a: any, b: any) => b.nilai - a.nilai);
    res.status(200).json(sortegetSchools);
  } catch (err) {
    console.log(err);
  }
};
