import { schools } from "../schoolsModel/schoolsModel";
import { Request, Response } from "express";
export const DeleteSchool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const deleteRoles = await schools.findByIdAndDelete({ _id: id });
    const getSchools = await schools.find();
    const sortegetSchools = getSchools.sort((a: any, b: any) => b.nilai - a.nilai);
    res.status(200).json(sortegetSchools);
  } catch (err) {
    console.log(err);
  }
};
