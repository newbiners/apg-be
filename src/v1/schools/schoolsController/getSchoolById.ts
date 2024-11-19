import { schools } from "../schoolsModel/schoolsModel"
import { Request, Response } from "express"
export const GetSchoolById = async (req : Request, res : Response): Promise<void> => {
    try{
        const id = req.params.id
        const getSchool = await schools.findOne({_id : id});
        res.status(200).json({message : "success", data : getSchool});
    }catch (err) {
        console.log(err)
    }
}