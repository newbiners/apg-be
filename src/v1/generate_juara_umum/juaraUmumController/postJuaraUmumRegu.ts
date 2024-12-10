// import { Request, Response } from "express";
// import { juaraUmum } from "../juaraUmumModel/juaraUmumModel";
// import { regu } from "../../regu/reguModel/reguModel";
// import { nilaiJuri } from "../../nilaiJuri/nilaiJuriModel/nilaiJuriModel";
// import { lomba } from "../../lomba/lombaModel/lombaModel";
// interface RequestBody {
//   type: string; // Ganti `any` dengan tipe yang sesuai
//   gender?: string; // Ganti `any` dengan tipe yang sesuai, jika opsional tetap gunakan tanda `?`
// }

// export const postJuaraUmumRegu = async (
//   req: Request<{}, {}, RequestBody>,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { gender, type } = req.body;

//     if (!type) {
//       res.status(400).json({ error: "Type is required." });
//     }

//     const filter: Partial<RequestBody> = { type, gender };

//     const filterRegu = {
//       gender: gender,
//     }

//     await juaraUmum.deleteMany(filter);

//     const regu_data = await regu.find(filterRegu);
//     const lomba_data = await lomba.find({ type: type });



//     var data_arr: any = [];
//     for (let i = 0; i < regu_data.length; i++) {
//       var key = regu_data[i]._id.toString();

//       for (let j = 0; j < lomba_data.length; j++) {
//         const nilaiJuriData = await nilaiJuri.find({
//           regu: key,
//           lomba: lomba_data[j]._id
//         })
//         data_arr[lomba_data[j].name.toString()].push(nilaiJuriData)
//       }
//     }

//     res.status(200).json(data_arr);

//     const getData = await juaraUmum.find(filter);

//     res.status(200).json(getData);
//   } catch (err) {
//     console.error("Error fetching data:", err);
//     res.status(500).json({ error: "Internal Server Error." });
//   }
// };

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

    // Kirim hasil
    res.status(200).json(dataArr);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

