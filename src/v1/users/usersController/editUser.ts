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
        const lomba_id = [lomba];
        const getRoles = await getRole();
        const getLombas: any = await getlomba(lomba_id);

        // Fetch all users
        const getUsers = await User.find();

        // Map users with roles and lomba
        const usersWithRoles = getUsers.map((user) => {
            const userWithRole = user.toObject();
            userWithRole.role = getRoles[user.role.toString()] || null;
            userWithRole.lomba = getLombas[user.lomba.toString()] || null;

            return userWithRole;
        });

        // Send response
        res.status(200).json(usersWithRoles);
    } catch (err) {
        console.error("Error in EditUser:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
