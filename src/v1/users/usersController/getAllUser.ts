import { Request, Response } from "express"
import { User } from "../usersModel/userModel";
export const GetAllUsers = async (req : Request, res : Response): Promise<void> => {
    try{
        const getUsers = await User.find();
        res.status(200).json(getUsers);
    }catch (err) {
        console.log(err)
    }
}