// import { lomba } from "../lombaModel/lombaModel";
// import { Request, Response } from "express";
// import { regu } from "../../regu/reguModel/reguModel";
// import { nilaiLombaDetail } from "../../nilaiLombaDetail/nilaiLombaDetailModel/nilaiLombaDetailModel";
// import { lombaDetail } from "../../lombaDetail/lombaDetailModel/lombaDetailModel";
// import { schools } from "../../schools/schoolsModel/schoolsModel";
// export const exportExl = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.body;

//         // Check if Lomba exists
//         const getLomba = await lomba.findOne({ _id: id });
//         // res.status(200).json(getLomba);
//         if (!getLomba) {
//             res.status(404).json({ message: "Data not found" });
//             return;
//         }

//         // Get all regu
//         const regus = await regu.find();
//         const lombaDetails = await lombaDetail.find({ header: id });

//         var dataArr = [];
//         for (let i = 0; i < regus.length; i++) {
//             var res.name = regus[i].name;
//             const school = await schools.findById(regus[i].school);
//             res.pangkalan = school?.name;
//             for (let j = 0; j < lombaDetails.length; j++) {
//                 const reguId = regus[i]._id;
//                 const lombaDetailId = lombaDetails[j]._id;
//                 const nilaiLombaDetails = await nilaiLombaDetail.findOne({ regu: reguId, lombaDetail: lombaDetailId });
//                 res.lomabaDetails[j].name = nilaiLombaDetails.nilai;
//             }
//             dataArr.push(res);
//         }


//         // Return the result
//         res.status(200).json(dataArr);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

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
                };

                for (const [index, detail] of lombaDetails.entries()) {
                    const nilaiLombaDetails = await nilaiLombaDetail.findOne({
                        regu: currentRegu._id,
                        lombaDetail: detail._id,
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
