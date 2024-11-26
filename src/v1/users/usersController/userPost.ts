import { User } from "../usersModel/userModel";
import { getRole } from "./getAllUser";
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
export const userPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, username, password, role, active } = req.body;

        const salt_id = process.env.SALT;
        const salt = bcrypt.genSaltSync(Number(salt_id));
        const hashPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({
            name,
            username,
            password: hashPassword,
            role,
            active
        });
        const saveUser = await newUser.save();
        const getRoles = await getRole();

        const getUser = await User.find();

        const usersWithRoles = getUser.map((user) => {
            const userWithRole = user.toObject();
            userWithRole.role = getRoles[user.role.toString()] || null;
            return userWithRole;
        });


        res.status(200).json(usersWithRoles);
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

