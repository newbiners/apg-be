import { Request, Response } from "express";
import { nilaiJuri } from "../nilaiJuriModel/nilaiJuriModel";
import { IUser, User } from "../../users/usersModel/userModel";
import { lombaDetail, ILombaDetail } from "../../lombaDetail/lombaDetailModel/lombaDetailModel";
import jwt from 'jsonwebtoken';
import { get } from "http";
export const getNilaiJuriByAdmin = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { nilai_lomba_detail_id } = req.body;



        const filter = {
            nilai_lomba_detail_id: nilai_lomba_detail_id
        }

        const getData = await nilaiJuri.find(filter)
        // res.status(200).json(getData);


        var data_arr: any[] = [];
        for (let i = 0; i < getData.length; i++) {
            getData[i].lomba_detail = await lombaDetail.findById(getData[i].lomba_detail) ?? {} as ILombaDetail;
            getData[i].create = await User.findById(getData[i].create) ?? {} as IUser;
            data_arr.push(getData[i])
        }


        res.status(200).json(data_arr);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};



