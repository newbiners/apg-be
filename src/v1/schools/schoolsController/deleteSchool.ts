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
    res.status(200).json(getSchools);
  } catch (err) {
    console.log(err);
  }
};
