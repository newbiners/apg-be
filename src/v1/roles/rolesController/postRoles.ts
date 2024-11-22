import { Request, Response } from "express"
import { roles } from "../rolesModel/rolesModel"
export const PostRoles = async (req : Request, res : Response): Promise<void> => {
    try{
        const { name } = req.body;
        const newRoles = new roles({
            name
        });
        const saveRoles = await newRoles.save();
        
        const getRoles = await roles.find();
        res.status(200).json(getRoles);
    }catch (err) {
        console.log(err)
    }
}