import { Request, Response } from "express";
import { lomba } from "../lombaModel/lombaModel";
import { regu } from "../../regu/reguModel/reguModel";
import { User } from "../../users/usersModel/userModel";
import jwt from 'jsonwebtoken'
export const Lomba = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // const { id } = req.params;
        const { gender, name } = req.body;


        const getLomba = await lomba.findOne({ name: name });

        const regu_data = await regu.find({ gender: gender });

        res.status(200).json({
            lomba: getLomba,
            regu: regu_data
        });
    } catch (err) {
        console.log(err);
    }
};
