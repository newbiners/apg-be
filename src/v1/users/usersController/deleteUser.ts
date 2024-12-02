import { User } from "../usersModel/userModel"
import { Request, Response } from "express"
import { getRole, getlomba } from "./getAllUser"
export const DeleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const deleteUser = await User.findByIdAndDelete({ _id: id });

        if (deleteUser == null) {
            res.status(400).json({ message: "User not found" })
        }

        const getRoles = await getRole();

        const getUser = await User.find();

        const lomba_id: string[] = getUser.map((user) => user.lomba && user.lomba.toString());
        // res.status(200).json(lomba_id);

        // Fetch related lomba data
        const lombaReturn: any = await getlomba(lomba_id);
        // res.status(200).json(lombaReturn);


        // Map users with roles and lomba
        const usersWithRoles = getUser.map((user) => {
            const userWithRole = user.toObject(); // Convert Mongoose document to plain object
            userWithRole.role = getRoles[user.role.toString()] || null; // Assign role or null if not found
            userWithRole.lomba = user.lomba ? lombaReturn[user.lomba.toString()] || null : null; 
            return userWithRole;
        });



        res.status(200).json(usersWithRoles);
    } catch (err) {
        console.log(err)
    }
}