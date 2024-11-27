import { Request, Response } from "express";
import { schools } from "../../schools/schoolsModel/schoolsModel";
import { lomba as lombadb } from "../../lomba/lombaModel/lombaModel";
import { nilaiJuri } from "../nilaiJuriModel/nilaiJuriModel";
import { nilaiLombaDetail } from "../../nilaiLombaDetail/nilaiLombaDetailModel/nilaiLombaDetailModel";
import { nilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
import { get } from "mongoose";
import { regu } from "../../regu/reguModel/reguModel";
import jwt from 'jsonwebtoken';
export const getNilaiJuri = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { create, nilai_lomba_detail_id } = req.body;

        const token = create && create.split(' ')[1];
        const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

        res.status(200).json(decoded);


        const getData = await nilaiJuri.find({
            // create: decoded.payload,
            nilai_lomba_detail_id: { $in: nilai_lomba_detail_id }
        })

        res.status(200).json(getData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};



