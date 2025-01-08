import { lomba } from "../lombaModel/lombaModel";
import { Request, Response } from "express";
import { regu } from "../../regu/reguModel/reguModel";
import { nilaiLombaDetail } from "../../nilaiLombaDetail/nilaiLombaDetailModel/nilaiLombaDetailModel";
import { lombaDetail } from "../../lombaDetail/lombaDetailModel/lombaDetailModel";
import { schools } from "../../schools/schoolsModel/schoolsModel";

export const exportExl = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.body;

        // Check if Lomba exists
        const getLomba = await lomba.findOne({ _id: id });
        if (!getLomba) {
            res.status(404).json({ message: "Data not found" });
            return;
        }

        // Get all regu and lomba details
        const regus = await regu.find();
        const lombaDetails = await lombaDetail.find({ header: id });

        const dataArr = await Promise.all(
            regus.map(async (currentRegu) => {
                const school = await schools.findById(currentRegu.school);

                const reguData: any = {
                    name: currentRegu.name,
                    pangkalan: school?.name || "Unknown",
                    ["mata lomba"]: getLomba.name,
                };

                for (const [index, detail] of lombaDetails.entries()) {
                    const nilaiLombaDetails = await nilaiLombaDetail.findOne({
                        regu: currentRegu._id,
                        lomba_detail: detail._id,
                    });

                    // Add detail dynamically as detail1, detail2, etc.
                    reguData[`${detail.name}`] = nilaiLombaDetails?.nilai || 0; // Default nilai to 0 if not found
                }

                return reguData;
            })
        );

        // Return the result
        res.status(200).json(dataArr);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
