import { Request, Response } from "express";
import { regu } from "../reguModel/reguModel";
import { schools } from "../../schools/schoolsModel/schoolsModel";
export const PostRegu = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, gender, school, nilai = 0 } = req.body;
    // res.status(200).json(school);
    const newRegu = new regu({
      name,
      gender,
      school,
      nilai,
    });
    await newRegu.save();

    const getRegu = await regu.find();

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

export const schoolData = async (data: any) => {
  const school = await schools.find({
    _id: {
      $in: data,
    },
  });

  var data_result: Record<string, (typeof school)[0]> = {};
  for (var i = 0; i < school.length; i++) {
    data_result[school[i]._id.toString()] = school[i];
  }

  return data_result;
};
