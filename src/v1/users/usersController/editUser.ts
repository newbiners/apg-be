import { Request, Response } from "express";
import { User } from "../usersModel/userModel";
import bcrypt from "bcryptjs";
import { roles, IRoles } from "../../roles/rolesModel/rolesModel";
import { getRole } from "./getAllUser";
export const EditUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, username, password, role, active, lomba } = req.body;


        const user = await User.findOne({ _id: id });


        var data: { name: any; username: any; role: any; active: any; password?: string; lomba?: string } = {
            name,
            username,
            lomba,
            role,
            active
        }
        if (user?.password != password) {
            const salt_id = process.env.SALT;
            const salt = bcrypt.genSaltSync(Number(salt_id));
            const hashPassword = bcrypt.hashSync(password, salt);
            data.password = hashPassword;
        }

        const newUser = await User.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
        const getRoles = await getRole();

        const getUser = await User.find();

        const usersWithRoles = getUser.map((user) => {
            const userWithRole = user.toObject();
            userWithRole.role = getRoles[user.role.toString()] || null;
            return userWithRole;
        });


        res.status(200).json(usersWithRoles);
    } catch (err) {
        console.log(err);
    }
};

