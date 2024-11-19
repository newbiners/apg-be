import { Request, Response } from "express";
import { regu } from "../reguModel/reguModel";
import { schoolData } from "./postRegu";
export const GetSearchRegu = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search as string || ''; 
    const getRegu = await regu.find({
        name: { $regex: search, $options: "i" }
    });

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
