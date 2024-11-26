import { User } from "../usersModel/userModel";
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { generateAccessToken } from "../../../global/generateAccessToken";
export const userLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { password, username } = req.body;
        var user;
        if (username !== null) {
            user = await User.findOne({ username: username });
        }

        if (user == null) {
            res.status(400).json({ message: " username salah" })
        } else if (user.active == false) {
            res.status(400).json({ message: " username belum di ativekan" })
        } else {
            const confirmPassword = bcrypt.compareSync(password, user.password);

            if (!confirmPassword) {
                res.status(400).json({ message: confirmPassword })
            }

            const accessToken = generateAccessToken({ payload: user._id })

            res.status(200).json({ message: "success", accessToken: accessToken })

        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

