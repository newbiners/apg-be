import { nilaiJuri } from "../nilaiJuriModel/nilaiJuriModel"
import { nilaiLombaDetail } from "../../nilaiLombaDetail/nilaiLombaDetailModel/nilaiLombaDetailModel"
import { nilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel"
import { regu } from "../../regu/reguModel/reguModel"
import { schools } from "../../schools/schoolsModel/schoolsModel"
import { Request, Response } from "express";

export const Reset = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = req.body?.id as any;

        // if (id != "112211") {
            res.status(400).json({ message: id })
            return
        // }
        await nilaiJuri.deleteMany({});

        const filter = {};

        // Perubahan untuk memperbarui nilai menjadi 0
        const update = {
            $set: {
                nilai: 0, // Ganti 'fieldName' dengan nama properti yang ingin Anda perbarui
            },
        };

        await nilaiLombaDetail.updateMany(filter, update);
        await nilaiLomba.updateMany(filter, update);
        await regu.updateMany(filter, update);
        await schools.updateMany(filter, update);
        res.status(200).json({ message: "Success" })


    } catch (err) {
        console.log(err);
    }
}