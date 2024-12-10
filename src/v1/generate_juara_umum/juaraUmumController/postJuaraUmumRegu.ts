// import { Request, Response } from "express";
// import { juaraUmum } from "../juaraUmumModel/juaraUmumModel";
// import { regu } from "../../regu/reguModel/reguModel";
// import { nilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
// import { lomba } from "../../lomba/lombaModel/lombaModel";
// import { schools } from "../../schools/schoolsModel/schoolsModel";

// interface RequestBody {
//   type: string;
//   gender?: string;
// }

// export const postJuaraUmumRegu = async (
//   req: Request<{}, {}, RequestBody>,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { gender, type } = req.body;

//     if (!type) {
//       res.status(400).json({ error: "Type is required." });
//       return;
//     }

//     // Filter untuk penghapusan dan pencarian
//     const filter: Partial<RequestBody> = { type, gender };
//     const filterRegu = { gender };

//     // Hapus data juara umum sebelumnya berdasarkan filter
//     await juaraUmum.deleteMany(filter);

//     // Ambil data regu dan lomba
//     const reguData = await regu.find(filterRegu);
//     const lombaData = await lomba.find({ type });

//     const dataArr: Record<string, any[]> = {};

//     for (const reguItem of reguData) {
//       const reguId = reguItem._id.toString();
//       const pangkalan = await schools.findById(reguItem.school);

//       for (const lombaItem of lombaData) {
//         const lombaId = lombaItem._id.toString();

//         // Ambil data nilai lomba berdasarkan regu dan lomba
//         const nilaiLombaData: any[] = await nilaiLomba.find({
//           regu: reguId,
//           lomba: lombaId,
//         });

//         nilaiLombaData.sort((a, b) => b.nilai - a.nilai);

//         // Berikan nilai berdasarkan peringkat
//         nilaiLombaData.forEach((item, index) => {
//           item.nilai_juara = index === 0 ? 5 : index === 1 ? 3 : index === 2 ? 1 : 0;
//         });

//         const lombaName = lombaItem.name.toString();

//         if (!dataArr[lombaName]) {
//           dataArr[lombaName] = [];
//         }

//         nilaiLombaData.forEach((item) => {
//           dataArr[lombaName].push({
//             regu: reguItem,
//             regu_id: reguItem._id,
//             pangkalan: pangkalan || null,
//             lomba: lombaItem,
//             lomba_id: lombaItem._id,
//             nilai: item.nilai,
//             nilai_juara: item.nilai_juara,
//             type,
//             gender,
//           });
//         });
//       }
//     }

//     // Format data untuk penyimpanan
//     const dataJuara = Object.values(dataArr).flatMap((data) =>
//       data.map((item) => ({
//         name: item.lomba,
//         header: item.regu,
//         pangkalan: item.pangkalan,
//         type: item.type,
//         gender: item.gender,
//         nilai: item.nilai_juara,
//       }))
//     );

//     // Simpan data ke database
//     await juaraUmum.insertMany(dataJuara);

//     var data_header: any = [];
//     for (const data of dataJuara) {
//       var key = data.header._id.toString();
//       if (!data_header[key]) {
//         data_header[key].push({
//           name: data.header,
//           type: data.type,
//           gender: data.gender,
//           pangkalan: data.pangkalan,
//           nilai: data.nilai
//         });
//       } else {
//         data_header[key].nilai += data.nilai
//       }
//     }

//     // Kirim hasil
//     res.status(200).json({ "data_detail": dataJuara, "data_header": data_header });
//   } catch (err) {
//     console.error("Error processing data:", err);
//     res.status(500).json({ error: "Internal Server Error." });
//   }
// };

import { Request, Response } from "express";
import { juaraUmum } from "../juaraUmumModel/juaraUmumModel";
import { regu } from "../../regu/reguModel/reguModel";
import { nilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
import { lomba } from "../../lomba/lombaModel/lombaModel";
import { schools } from "../../schools/schoolsModel/schoolsModel";

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
      const pangkalan = await schools.findById(reguItem.school);

      for (const lombaItem of lombaData) {
        const lombaId = lombaItem._id.toString();

        // Ambil data nilai lomba berdasarkan regu dan lomba
        const nilaiLombaData: any[] = await nilaiLomba.find({
          regu: reguId,
          lomba: lombaId,
        });

        nilaiLombaData.sort((a, b) => b.nilai - a.nilai);

        // Berikan nilai berdasarkan peringkat
        nilaiLombaData.forEach((item, index) => {
          item.nilai_juara = index === 0 ? 5 : index === 1 ? 3 : index === 2 ? 1 : 0;
        });

        const lombaName = lombaItem._id.toString();

        if (!dataArr[lombaName]) {
          dataArr[lombaName] = [];
        }

        nilaiLombaData.forEach((item) => {
          dataArr[lombaName].push({
            regu: reguItem,
            regu_id: reguItem._id,
            pangkalan: pangkalan || null,
            lomba: lombaItem,
            lomba_id: lombaItem._id,
            nilai: item.nilai,
            nilai_juara: item.nilai_juara,
            type,
            gender,
          });
        });
      }
    }

    res.status(200).json(dataArr);
    // Format data untuk penyimpanan
    const dataJuara = Object.values(dataArr).flatMap((data) =>
      data.map((item) => ({
        name: item.lomba,
        header: item.regu,
        pangkalan: item.pangkalan,
        type: item.type,
        gender: item.gender,
        nilai: item.nilai_juara,
      }))
    );

    // Simpan data ke database
    await juaraUmum.insertMany(dataJuara);

    // Kumpulkan data header
    const dataHeaderMap = new Map<string, any>();

    dataJuara.forEach((data) => {
      const key = data.header._id.toString();

      if (!dataHeaderMap.has(key)) {
        dataHeaderMap.set(key, {
          name: data.header,
          type: data.type,
          gender: data.gender,
          pangkalan: data.pangkalan,
          nilai: data.nilai,
        });
      } else {
        const existingData = dataHeaderMap.get(key);
        existingData.nilai += data.nilai;
        dataHeaderMap.set(key, existingData);
      }
    });

    const dataHeader = Array.from(dataHeaderMap.values());

    // Kirim hasil
    res.status(200).json({ data_detail: dataJuara, data_header: dataHeader });
  } catch (err) {
    console.error("Error processing data:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
