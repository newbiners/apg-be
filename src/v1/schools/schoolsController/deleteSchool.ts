import { schools } from "../schoolsModel/schoolsModel";
import { Request, Response } from "express";
import { nilaiJuri } from "../../nilaiJuri/nilaiJuriModel/nilaiJuriModel";
import { regu } from "../../regu/reguModel/reguModel";
export const DeleteSchool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const deleteRoles = await schools.findByIdAndDelete({ _id: id });

    await nilaiJuri.deleteMany({ school: id, type: 'pangkalan' })
    await regu.deleteMany({ school: id })
    const getSchools = await schools.find();
    const sortegetSchools = getSchools.sort((a: any, b: any) => b.nilai - a.nilai);
    res.status(200).json(sortegetSchools);
  } catch (err) {
    console.log(err);
  }
};
