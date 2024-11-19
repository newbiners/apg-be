import { User } from "../usersModel/userModel"
import { Request, Response } from "express"
export const DeleteUser = async (req : Request, res : Response): Promise<void> => {
    try{
        const id = req.params.id
        const deleteUser = await User.findByIdAndDelete({_id : id});

        if(deleteUser == null){
            res.status(400).json({message : "User not found"})
        }
        res.status(200).json(deleteUser);
    }catch (err) {
        console.log(err)
    }
}