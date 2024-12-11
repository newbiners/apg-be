import { Request, Response } from "express";
import { juaraUmum } from "../juaraUmumModel/juaraUmumModel";
import { schools } from "../../schools/schoolsModel/schoolsModel";
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

        var data_header: any[] = [];
        var data_detail: any[] = [];
        for (let i = 0; i < getData.length; i++) {
            if (!getData[i].header) {
                data_header.push(getData[i])
            } else {
                data_detail.push(getData[i])
            }
        }


        var data_finis = await Promise.all(
            data_header.map(async (x) => {
                const school = await schools.findById(x.school);
                x.school = school;
            })
        );

        res.status(200).json({ data_detail: data_detail, data_header: data_finis });
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};
