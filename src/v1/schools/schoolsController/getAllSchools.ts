import { Request, Response } from "express"
import { schools } from "../schoolsModel/schoolsModel";
export const GetAllSchools = async (req : Request, res : Response): Promise<void> => {
    try{
        const getSchools = await schools.find();
        res.status(200).json(getSchools);
    }catch (err) {
        console.log(err)
    }
}