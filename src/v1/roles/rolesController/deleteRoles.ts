import { roles } from "../rolesModel/rolesModel";
import { Request, Response } from "express"
export const DeleteRoles = async (req : Request, res : Response): Promise<void> => {
    try{
        const id = req.params.id
        const deleteRoles = await roles.findByIdAndDelete({_id : id});
        res.status(200).json('TEST');
        const getRoles = await roles.find();
        res.status(200).json(getRoles);
    }catch (err) {
        console.log(err)
    }
}