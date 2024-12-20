import { Request, Response } from "express";
import { nilaiJuri } from "../nilaiJuriModel/nilaiJuriModel";
import { IUser, User } from "../../users/usersModel/userModel";
import { lombaDetail, ILombaDetail } from "../../lombaDetail/lombaDetailModel/lombaDetailModel";
import { createNilaiLomba, createNilaiLombaDetail, createNilaiRegu, createNilaiSchool } from "./postNilaiJuri";
import jwt from 'jsonwebtoken';
import { get } from "http";
export const DeleteNilaiJuri = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.body;





        const rm = await nilaiJuri.findByIdAndDelete(id)

        await createNilaiSchool(rm);
        await createNilaiRegu(rm);
        await createNilaiLomba(rm);
        await createNilaiLombaDetail(rm);

        const getData = await nilaiJuri.find({
            nilai_lomba_detail_id: rm?.nilai_lomba_detail_id
        })
        // res.status(200).json(getData);


        if (getData.length == 0) {
            res.status(400).json([])
        }

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



