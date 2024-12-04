import { User } from "../usersModel/userModel";
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { roles } from "../../roles/rolesModel/rolesModel";
export const userLogout = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        // res.status(200).json({ message: id });
        var filter: any = {};
        if (id) {
            // res.status(200).json(id);
            const token = id && id.split(' ')[1];
            const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
            const currentUser: any = await User.findOne({ _id: decoded.payload });



            if (currentUser) {
                const role = await roles.findOne({ _id: currentUser.role });
                if (role && role.name !== "ADMIN") {
                    await User.findByIdAndUpdate(currentUser._id, { active: false }, { new: true });
                }
            }
        }

        res.status(200).json({ message: "success" });

    } catch (error) {
        res.status(400).json({ message: error })
    }
}

