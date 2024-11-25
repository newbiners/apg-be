import { User } from "../usersModel/userModel";
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, username, password, confirmPassword, role } = req.body;

        // res.json({ name, username, password, confirmPassword, role });
        if (password != confirmPassword) {
            res.status(400).json({ message: "Password not match" })
        }
        const salt_id = process.env.SALT;
        const salt = bcrypt.genSaltSync(Number(salt_id));
        const hashPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({
            name,
            username,
            password: hashPassword,
            role
        });
        const saveUser = await newUser.save();
        res.json(saveUser);
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

