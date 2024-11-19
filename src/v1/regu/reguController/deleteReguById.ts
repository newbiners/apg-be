import { regu } from "../reguModel/reguModel";
import { Request, Response } from "express";
import { schoolData } from "./postRegu";
export const DeleteRoles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    await regu.findByIdAndDelete({ _id: id });

    const getRegu = await regu.find();

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
