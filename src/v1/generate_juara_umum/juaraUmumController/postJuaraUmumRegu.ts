import { Request, Response } from "express";
import { juaraUmum } from "../juaraUmumModel/juaraUmumModel";
import { regu } from "../../regu/reguModel/reguModel";
import { nilaiJuri } from "../../nilaiJuri/nilaiJuriModel/nilaiJuriModel";
import { lomba } from "../../lomba/lombaModel/lombaModel";

interface RequestBody {
  type: string;
  gender?: string;
}

export const postJuaraUmumRegu = async (
  req: Request<{}, {}, RequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { gender, type } = req.body;

    if (!type) {
      res.status(400).json({ error: "Type is required." });
      return;
    }

    // Filter untuk penghapusan dan pencarian
    const filter: Partial<RequestBody> = { type, gender };
    const filterRegu = { gender };

    // Hapus data juara umum sebelumnya berdasarkan filter
    await juaraUmum.deleteMany(filter);

    // Ambil data regu dan lomba
    const reguData = await regu.find(filterRegu);
    const lombaData = await lomba.find({ type });

    const dataArr: Record<string, any[]> = {};

    for (const reguItem of reguData) {
      const reguId = reguItem._id.toString();

      for (const lombaItem of lombaData) {
        const lombaId = lombaItem._id.toString();

        // Ambil data nilai juri berdasarkan regu dan lomba
        const nilaiJuriData = await nilaiJuri.find({
          regu: reguId,
          lomba: lombaId,
        });

        var nilai = 0;
        for (let i = 0; i < nilaiJuriData.length; i++) {
          nilai += nilaiJuriData[i].nilai;
        }

        const lombaName = lombaItem.name.toString();

        // Inisialisasi array jika belum ada
        if (!dataArr[lombaName]) {
          dataArr[lombaName] = [];
        }

        // Tambahkan nilai juri ke data array
        dataArr[lombaName].push({
          regu: reguItem.name,
          regu_id: reguItem._id,
          pangkalan: reguItem.school,
          lomba: lombaItem.name,
          lomba_id: lombaItem._id,
          nilai: nilai,
        });
      }
    }


    // Format hasil untuk data_juara
    const data_juara = Object.keys(dataArr).map((lombaName) => {
      const lombaData = dataArr[lombaName];

      return lombaData.map((entry) => ({
        name: lombaName,
        header: entry.regu_id,
        regu: entry.regu,
        type,
        gender,
        nilai: entry.nilai,
      }));
    }).flat();


    // Kirim hasil
    res.status(200).json(data_juara);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
