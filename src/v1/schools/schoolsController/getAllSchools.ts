import { Request, Response } from "express"
import { schools } from "../schoolsModel/schoolsModel";
export const GetAllSchools = async (req: Request, res: Response): Promise<void> => {
    try {
        const getSchools = await schools.find();

        const sortegetSchools = getSchools.sort((a: any, b: any) => b.nilai - a.nilai);
        res.status(200).json(sortegetSchools);
    } catch (err) {
        console.log(err)
    }
}