import { Request, Response } from "express";
import { User } from "../usersModel/userModel";
import bcrypt from "bcryptjs";
import { getRole, getlomba } from "./getAllUser";

export const EditUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, username, password, role, active, lomba } = req.body;

        // Fetch user by ID
        const user = await User.findOne({ _id: id });

        // Prepare updated data
        const data: {
            name: string;
            username: string;
            role: string;
            active: boolean;
            password?: string;
            lomba?: string;
        } = { name, username, role, active, lomba };

        // Hash password if changed
        if (user?.password !== password) {
            const saltRounds = Number(process.env.SALT || 10);
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashPassword = bcrypt.hashSync(password, salt);
            data.password = hashPassword;
        }

        // Update user
        const newUser = await User.findByIdAndUpdate(id, data, { new: true });

        // Fetch roles and lomba details

        const getRoles = await getRole();
        // Fetch all users
        const getUsers = await User.find();

        const lomba_id: string[] = getUsers.map((user) => user.lomba && user.lomba.toString());
        // res.status(200).json(lomba_id);

        // Fetch related lomba data
        const lombaReturn: any = await getlomba(lomba_id);
        // res.status(200).json(lombaReturn);


        // Map users with roles and lomba
        const usersWithRoles = getUsers.map((user) => {
            const userWithRole = user.toObject(); // Convert Mongoose document to plain object
            userWithRole.role = getRoles[user.role.toString()] || null; // Assign role or null if not found
            userWithRole.lomba = user.lomba ? lombaReturn[user.lomba.toString()] || null : null; 
            return userWithRole;
        });


        // Send response
        res.status(200).json(usersWithRoles);
    } catch (err) {
        console.error("Error in EditUser:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
