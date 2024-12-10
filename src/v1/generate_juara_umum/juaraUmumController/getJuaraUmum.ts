import { Request, Response } from "express";
import { juaraUmum } from "../juaraUmumModel/juaraUmumModel";

interface RequestBody {
    type: string; // Ganti `any` dengan tipe yang sesuai
    gender?: string; // Ganti `any` dengan tipe yang sesuai, jika opsional tetap gunakan tanda `?`
}

export const getJuaraUmum = async (
    req: Request<{}, {}, RequestBody>,
    res: Response
): Promise<void> => {
    try {
        const { gender, type } = req.body;

        if (!type) {
            res.status(400).json({ error: "Type is required." });
        }

        const filter: Partial<RequestBody> = { type };

        if (gender) {
            filter.gender = gender;
        }

        const getData = await juaraUmum.find(filter);

        var data_arr: any = {};
        for (let i = 0; i < getData.length; i++) {
            var key = getData[i].name.toString();
            if (!data_arr[key]) {

                data_arr[key] = getData[i];
            } else {
                data_arr[key]['nilai'] += getData[i].nilai;
            }
        }
        res.status(200).json(data_arr);
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};
