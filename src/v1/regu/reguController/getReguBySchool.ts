import { Request, Response } from "express";
import { regu } from "../reguModel/reguModel";
import { schoolData } from "./postRegu";
export const getReguBySchool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { school, gender, type } = req.body;
    var filter: { school: string, gender?: string, _id?: any } = {
      school: school._id
    }
    if (gender) {
      filter.gender = gender
    }

    if (type == 'pangkalan') {
      filter['_id'] = {
        $nin: ['6768c767b69efe879cf5f938', "6768c779b69efe879cf5f93f", '676629d4ca6ad0790d885ab9', '676629f2ca6ad0790d885ac0']
      }
    }
    var getRegu = await regu.find(filter);


    if (type == 'pangkalan') {
      var getPa = getRegu.filter((data) => {
        return data.gender == "PA"
      })

      if (getPa.length > 0) {
        getRegu = getPa
      }
    }

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
