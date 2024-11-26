import { User } from "../usersModel/userModel"
import { Request, Response } from "express"
import { getRole } from "./getAllUser"
export const DeleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const deleteUser = await User.findByIdAndDelete({ _id: id });

        if (deleteUser == null) {
            res.status(400).json({ message: "User not found" })
        }

        const getRoles = await getRole();

        const getUser = await User.find();

        const usersWithRoles = getUser.map((user) => {
            const userWithRole = user.toObject();
            userWithRole.role = getRoles[user.role.toString()] || null;
            return userWithRole;
        });


        res.status(200).json(usersWithRoles);
    } catch (err) {
        console.log(err)
    }
}