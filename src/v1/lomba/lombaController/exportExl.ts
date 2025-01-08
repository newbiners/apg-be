import { lomba } from "../lombaModel/lombaModel";
import { Request, Response } from "express";
import { regu } from "../../regu/reguModel/reguModel";
import { nilaiLombaDetail } from "../../nilaiLombaDetail/nilaiLombaDetailModel/nilaiLombaDetailModel";

export const exportExl = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.body;

        // Check if Lomba exists
        const getLomba = await lomba.findOne({ _id: id });
        res.status(200).json(getLomba);
        if (!getLomba) {
            res.status(404).json({ message: "Data not found" });
            return;
        }

        // Get all regu
        const regus = await regu.find();

        // Get all nilaiLombaDetails for the given lomba
        const nilaiLombaDetails = await nilaiLombaDetail.find({ lomba: id });

        // Process data
        const result = regus.map((r) => {
            const reguDetails = nilaiLombaDetails.filter(
                (nld) => nld.regu.toString() === r._id.toString()
            );

            return {
                regu: r.name,
                nilaiReguDetails: reguDetails.map((detail) => ({
                    name: detail.nilai,
                })),
            };
        });

        // Return the result
        res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
