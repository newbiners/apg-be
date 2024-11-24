import { Request, Response } from "express";
import { User } from "../usersModel/userModel";
import bcrypt from "bcryptjs";
export const EditUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, username, password, role, active } = req.body;

        const salt_id = process.env.SALT;
        const salt = bcrypt.genSaltSync(Number(salt_id));
        const hashPassword = bcrypt.hashSync(password, salt);
        const newUser = await User.findByIdAndUpdate(
            id,
            {
                name,
                username,
                password: hashPassword,
                role,
                active
            },
            { new: true }
        );

        const getUser = await User.find();


        res.status(200).json(getUser);
    } catch (err) {
        console.log(err);
    }
};

