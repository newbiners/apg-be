import { User } from "../usersModel/userModel";
import { getRole, getlomba } from "./getAllUser";
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
export const userPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, username, password, role, active, lomba } = req.body;

        const salt_id = process.env.SALT;
        const salt = bcrypt.genSaltSync(Number(salt_id));
        const hashPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({
            name,
            username,
            password: hashPassword,
            role,
            active,
            lomba
        });
        const saveUser = await newUser.save();
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
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

