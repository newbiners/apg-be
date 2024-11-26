import { schools } from "../schoolsModel/schoolsModel";
import { Request, Response } from "express";
export const schoolPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      address,
      phone_number,
      email,
      createdAt,
      updatedAt,
      nilai = 0,
    } = req.body;
    // res.status(200).json(req.body);

    const newSchool = new schools({
      name,
      address,
      phone_number,
      email,
      nilai,
      createdAt,
      updatedAt,
    });
    const saveSchool = await newSchool.save();
    const getSchools = await schools.find();
    const sortegetSchools = getSchools.sort((a: any, b: any) => b.nilai - a.nilai);
    res.status(200).json(sortegetSchools);
  } catch (error) {
    console.log(error);
  }
};
