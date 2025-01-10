import { Request, Response } from "express";
import { lomba } from "../lombaModel/lombaModel";
import { regu } from "../../regu/reguModel/reguModel";
import { nilaiJuri } from "../../nilaiJuri/nilaiJuriModel/nilaiJuriModel";
import { schools } from "../../schools/schoolsModel/schoolsModel";
import { nilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
export const Lomba = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // const { id } = req.params;
        const { gender, name } = req.body;


        const getLomba = await lomba.findOne({ name: name });

        var filter: { gender?: any; _id?: any } = {
        }

        if (gender) {
            filter.gender = gender
        }

        if (getLomba?.type === "pangkalan") {
            filter['_id'] = {
                $nin: ['6768c767b69efe879cf5f938', "6768c779b69efe879cf5f93f", '676629d4ca6ad0790d885ab9', '676629f2ca6ad0790d885ac0']
            }
        }

        var regu_data = await regu.find(filter);

        if (getLomba?.type == 'pangkalan') {
            var reguResult: { [key: string]: any } = {};
            for (let i = 0; i < regu_data.length; i++) {
                var key = regu_data[i].school;
                if (!reguResult[key.toString()]) {
                    reguResult[key.toString()] = [];
                }
                reguResult[key.toString()].push(regu_data[i]);
            }

            var ress: any[] = [];
            for (const key in reguResult) {
                var value = reguResult[key];
                var vilter = value.filter((data: any) => {
                    data.gender == "PA"
                })
                if (vilter.length > 0) {
                    ress.push(vilter)
                } else {
                    // ress.push(value[0])
                }
            }
        }

        var result: any[] = [];
        for (let i = 0; i < regu_data.length; i++) {
            const regu_id = regu_data[i]._id;
            // const nilai_juri = await nilaiJuri.find({ regu: regu_id, type: getLomba?.type, lomba: getLomba?._id });
            const nilai_Lomba = await nilaiLomba.findOne({ regu: regu_id, lomba: getLomba?._id });

            const pangkalan = await schools.findById(regu_data[i].school);
            var total_nilai = nilai_Lomba && nilai_Lomba.nilai || 0;
            // for (let j = 0; j < nilai_juri.length; j++) {
            //     total_nilai += nilai_juri[j].nilai;
            // }
            result.push({
                regu: regu_data[i],
                pangkalan: pangkalan,
                total_nilai: total_nilai
            })
        }

        result.sort((a, b) => b.total_nilai - a.total_nilai);

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
};
