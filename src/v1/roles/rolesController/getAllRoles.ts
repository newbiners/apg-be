import { Request, Response } from "express"
import { roles } from "../rolesModel/rolesModel"
export const GetAllRoles = async (req : Request, res : Response): Promise<void> => {
    try{
        const getRoles = await roles.find();
        res.status(200).json(getRoles);
    }catch (err) {
        console.log(err)
    }
}