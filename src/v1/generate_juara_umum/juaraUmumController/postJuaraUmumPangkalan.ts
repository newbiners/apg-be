import { Request, Response } from "express";
import { juaraUmum } from "../juaraUmumModel/juaraUmumModel";
import { nilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
import { lomba } from "../../lomba/lombaModel/lombaModel";
import { schools } from "../../schools/schoolsModel/schoolsModel";

interface RequestBody {
    type: string;
    gender?: string;
}

export const postJuaraUmumPangkalan = async (
    req: Request<{}, {}, RequestBody>,
    res: Response
): Promise<void> => {
    try {
        const { type } = req.body;

        if (!type) {
            res.status(400).json({ error: "Type is required." });
            return;
        }

        // Filter untuk penghapusan dan pencarian
        const filter: Partial<RequestBody> = { type };
        // const filterRegu = { gender };

        // Hapus data juara umum sebelumnya berdasarkan filter
        await juaraUmum.deleteMany(filter);

        // Ambil data regu dan lomba
        const schoolData = await schools.find();
        const lombaData = await lomba.find({ type });

        const dataArr: Record<string, any[]> = {};

        for (const schoolItem of schoolData) {
            const schoolId = schoolItem._id.toString();

            for (const lombaItem of lombaData) {
                const lombaId = lombaItem._id.toString();

                // Ambil data nilai lomba berdasarkan regu dan lomba
                const nilaiLombaData: any[] = await nilaiLomba.find({
                    school: schoolId,
                    lomba: lombaId,
                    type: type,
                    // school: reguItem.school,
                });

                // nilaiLombaData.sort((a, b) => b.nilai - a.nilai);

                // nilaiLombaData.forEach((item, index) => {
                //   item.nilai_juara = index === 0 ? 5 : index === 1 ? 3 : index === 2 ? 1 : 0;
                // });

                const lombaName = lombaItem.name.toString();

                // if (!dataArr[lombaName]) {
                //     dataArr[lombaName] = [];
                // }

                // nilaiLombaData.forEach((item) => {
                //     dataArr[lombaName].push({
                //         pangkalan: schoolItem || null,
                //         lomba: lombaItem,
                //         lomba_id: lombaItem._id,
                //         nilai_default: item.nilai,
                //         // nilai_juara: item.nilai_juara,
                //         type,
                //     });
                // });

                nilaiLombaData.forEach((item) => {
                    const exists = dataArr[lombaName].some((entry) => entry.lomba_id === lombaItem._id && entry.pangkalan._id === schoolItem._id);
                    if (!exists) {
                        dataArr[lombaName].push({
                            pangkalan: schoolItem || null,
                            lomba: lombaItem,
                            lomba_id: lombaItem._id,
                            nilai_default: item.nilai,
                            type,
                        });
                    }
                });
            }
        }


        var dataArr1 = Object.values(dataArr);
        res.status(200).json(dataArr1);

        const dataJuara: any[] = [];
        for (let y = 0; y < dataArr1.length; y++) {
            dataArr1[y].sort((a: any, b: any) => b.nilai_default - a.nilai_default)

            for (let i = 0; i < dataArr1[y].length; i++) {
                if (i == 0) {
                    dataArr1[y][i].nilai = 5
                    dataJuara.push({
                        name: dataArr1[y][i].lomba,
                        header: dataArr1[y][i].pangkalan,
                        nilai: dataArr1[y][i].nilai,
                        type: type,
                    });
                } else if (i == 1) {
                    dataArr1[y][i].nilai = 3
                    dataJuara.push({
                        name: dataArr1[y][i].lomba,
                        header: dataArr1[y][i].pangkalan,
                        nilai: dataArr1[y][i].nilai,
                        type: type,
                    });
                } else if (i == 2) {
                    dataArr1[y][i].nilai = 1
                    dataJuara.push({
                        name: dataArr1[y][i].lomba,
                        header: dataArr1[y][i].pangkalan,
                        nilai: dataArr1[y][i].nilai,
                        type: type,
                    });
                } else {
                    dataArr1[y][i].nilai = 0
                    dataJuara.push({
                        name: dataArr1[y][i].lomba,
                        header: dataArr1[y][i].pangkalan,
                        nilai: dataArr1[y][i].nilai,
                        type: type,
                    });
                }
            }

        }
        // res.status(200).json(dataJuara);

        // Simpan data detail ke database
        await juaraUmum.insertMany(dataJuara);

        // Kumpulkan data header
        const dataHeaderMap = new Map<string, any>();

        dataJuara.forEach((data) => {
            const key = data.header._id.toString();

            if (!dataHeaderMap.has(key)) {
                dataHeaderMap.set(key, {
                    name: data.header,
                    type: data.type,
                    nilai: data.nilai,
                });
            } else {
                const existingData = dataHeaderMap.get(key);
                existingData.nilai += data.nilai;
                dataHeaderMap.set(key, existingData);
            }
        });

        const dataHeader = Array.from(dataHeaderMap.values());

        // Simpan data header ke database
        await juaraUmum.insertMany(dataHeader);

        // Kirim hasil
        res.status(200).json({ data_detail: dataJuara, data_header: dataHeader });
    } catch (err) {
        console.error("Error processing data:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

