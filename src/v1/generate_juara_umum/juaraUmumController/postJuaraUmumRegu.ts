// import { Request, Response } from "express";
// import { juaraUmum } from "../juaraUmumModel/juaraUmumModel";
// import { regu } from "../../regu/reguModel/reguModel";
// import { nilaiJuri } from "../../nilaiJuri/nilaiJuriModel/nilaiJuriModel";
// import { lomba } from "../../lomba/lombaModel/lombaModel";
// import { nilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
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

//         // Ambil data nilai juri berdasarkan regu dan lomba
//         const nilaiJuriData: any = await nilaiLomba.find({
//           regu: reguId,
//           lomba: lombaId,
//         });

//         nilaiJuriData.sort((a: any, b: any) => b.nilai - a.nilai);

//         // Berikan nilai berdasarkan peringkat
//         for (let i = 0; i < nilaiJuriData.length; i++) {
//           if (i === 0) {
//             nilaiJuriData[i].nilai_juara = 5;
//           } else if (i === 1) {
//             nilaiJuriData[i].nilai_juara = 3;
//           } else if (i === 2) {
//             nilaiJuriData[i].nilai_juara = 1;
//           } else {
//             nilaiJuriData[i].nilai_juara = 0;
//           }
//         }

//         // const totalNilai = nilaiJuriData.reduce((sum: number, item: any) => sum + item.nilai, 0);
//         // const totalJuara = nilaiJuriData.reduce((sum: number, item: any) => sum + item.nilai_juara, 0);

//         const lombaName = lombaItem.name.toString();

//         // Inisialisasi array jika belum ada
//         if (!dataArr[lombaName]) {
//           dataArr[lombaName] = [];
//         }


//         for (let i = 0; i < nilaiJuriData.length; i++) {
//           dataArr[lombaName].push({
//             regu: reguItem,
//             regu_id: reguItem._id,
//             pangkalan: pangkalan,
//             lomba: lombaItem,
//             lomba_id: lombaItem._id,
//             nilai: nilaiJuriData[i].nilai,
//             nilai_juara: nilaiJuriData[i].nilai_juara,
//             type: type,
//             gender: gender
//           });
//         }
//         // Tambahkan nilai juri ke data array
//       }
//     }

//     // Simpan data ke database

//     var data_juara: any = [];
//     for (let data of Object.values(dataArr)) {
//       data_juara.push({
//         name: data.lomba,
//         header: data.regu,
//         pangkalan: data.pangkalan,
//         type: type,
//         gender: gender,
//         nilai: data.nilai
//       })
//     }

//     await juaraUmum.insertMany(Object.values(data_juara));

//     // Kirim hasil
//     res.status(200).json(dataArr);
//   } catch (err) {
//     console.error("Error fetching data:", err);
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

        const lombaName = lombaItem.name.toString();

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

    // Kirim hasil
    res.status(200).json({ message: "Data successfully processed.", data: dataJuara });
  } catch (err) {
    console.error("Error processing data:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
