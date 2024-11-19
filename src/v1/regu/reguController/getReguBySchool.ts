import { Request, Response } from "express";
import { regu } from "../reguModel/reguModel";
import { schoolData } from "./postRegu";
export const getReguBySchool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { school } = req.body;
    const getRegu = await regu.find({ school: school._id });

    const school_id = getRegu.map((data) => data.school);
    const getSchool = await schoolData(school_id);

    getRegu.forEach((data) => {
      data.school = getSchool[data.school.toString()];
    });
    res.status(200).json(getRegu);
  } catch (err) {
    console.log(err);
  }
};
