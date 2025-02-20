import { Request, Response } from "express";
import { nilaiJuri } from "../nilaiJuriModel/nilaiJuriModel";
import { User } from "../../users/usersModel/userModel";
import jwt from 'jsonwebtoken';
import { nilaiLombaDetail } from "../../nilaiLombaDetail/nilaiLombaDetailModel/nilaiLombaDetailModel";
export const getNilaiJuri = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { create, nilai_lomba_detail_id } = req.body;

        const token = create && create.split(' ')[1];
        const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        const user = await User.findOne({ _id: decoded.payload });

        if (!user) {
            res.status(400).json({ message: "User not found" })
        }

        const filter = {
            create: user && user._id || "",
            nilai_lomba_detail_id: { $in: nilai_lomba_detail_id }
        }

        const getData = await nilaiJuri.find(filter)
        // res.status(200).json(getData);


        var data_arr: Record<string, number> = {};
        for (let i = 0; i < getData.length; i++) {
            data_arr[getData[i].nilai_lomba_detail_id.toString()] = getData[i].nilai || 0
        }


        res.status(200).json(data_arr);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};

export const getNilaiJuriSemu = async (
    req: Request,
    res: Response
): Promise<void> => {
    const getData = await nilaiJuri.find({ nilai_lomba_id: "6766c725b69efe879cf5ca8b" })
    res.status(200).json(getData);


    var data_arr: Record<string, number> = {};
    for (let i = 0; i < getData.length; i++) {
        data_arr[getData[i].nilai_lomba_detail_id.toString()] = getData[i].nilai || 0
    }


    res.status(200).json(data_arr);
}

export const getNilaiLombaDetail = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        var data = await nilaiLombaDetail.find({ _id: "6766c726b69efe879cf5ca8f" })
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
