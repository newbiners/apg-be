import { User } from "../usersModel/userModel"
import { Request, Response } from "express"
export const GetUserById = async (req : Request, res : Response): Promise<void> => {
    try{
        const id = req.params.id
        const user = await User.findOne({_id : id});

        if(user == null){
            res.status(400).json({message : "User not found"})
        }
        res.status(200).json(user);
    }catch (err) {
        console.log(err)
    }
}