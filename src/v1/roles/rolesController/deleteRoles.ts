import { roles } from "../rolesModel/rolesModel";
import { Request, Response } from "express"
export const DeleteRoles = async (req : Request, res : Response): Promise<void> => {
    try{
        const id = req.params.id
        const deleteRoles = await roles.findByIdAndDelete({_id : id});
        res.status(200).json(deleteRoles);
    }catch (err) {
        console.log(err)
    }
}