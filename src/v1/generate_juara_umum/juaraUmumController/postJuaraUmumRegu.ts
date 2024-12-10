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

//       for (const lombaItem of lombaData) {
//         const lombaId = lombaItem._id.toString();

//         // Ambil data nilai juri berdasarkan regu dan lomba
//         var nilaiJuriData = await nilaiLomba.find({
//           regu: reguId,
//           lomba: lombaId,
//         });

//         nilaiJuriData.sort((a: any, b: any) => b.nilai - a.nilai);

//         for (let i = 0; i < nilaiJuriData.length; i++) {
//           if(i == 0){
//             nilaiJuriData[i].nilai = 5;
//           }else if(i == 1){
//             nilaiJuriData[i].nilai = 3;
//           }else if(i == 2){
//             nilaiJuriData[i].nilai = 1;
//           }else {
//             nilaiJuriData[i].nilai = 0;
//           }
//         }

//         const lombaName = lombaItem.name.toString();

//         // Inisialisasi array jika belum ada
//         if (!dataArr[lombaName]) {
//           dataArr[lombaName] = [];
//         }


//         const pangkalan = await schools.findById(reguItem.school);

//         // Tambahkan nilai juri ke data array
//         dataArr[lombaName].push({
//           regu: reguItem,
//           regu_id: reguItem._id,
//           pangkalan: pangkalan,
//           lomba: lombaItem,
//           lomba_id: lombaItem._id,
//           nilai: nilai,
//         });
//       }
//     }



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
import { nilaiJuri } from "../../nilaiJuri/nilaiJuriModel/nilaiJuriModel";
import { lomba } from "../../lomba/lombaModel/lombaModel";
import { nilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
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

      for (const lombaItem of lombaData) {
        const lombaId = lombaItem._id.toString();

        // Ambil data nilai juri berdasarkan regu dan lomba
        const nilaiJuriData: any = await nilaiLomba.find({
          regu: reguId,
          lomba: lombaId,
        });

        nilaiJuriData.sort((a: any, b: any) => b.nilai - a.nilai);

        // Berikan nilai berdasarkan peringkat
        for (let i = 0; i < nilaiJuriData.length; i++) {
          if (i === 0) {
            nilaiJuriData[i].nilai_juara = 5;
          } else if (i === 1) {
            nilaiJuriData[i].nilai_juara = 3;
          } else if (i === 2) {
            nilaiJuriData[i].nilai_juara = 1;
          } else {
            nilaiJuriData[i].nilai_juara = 0;
          }
        }

        const totalNilai = nilaiJuriData.reduce((sum: number, item: any) => sum + item.nilai, 0);
        const totalJuara = nilaiJuriData.reduce((sum: number, item: any) => sum + item.nilai_juara, 0);

        const lombaName = lombaItem.name.toString();

        // Inisialisasi array jika belum ada
        if (!dataArr[lombaName]) {
          dataArr[lombaName] = [];
        }

        const pangkalan = await schools.findById(reguItem.school);

        // Tambahkan nilai juri ke data array
        dataArr[lombaName].push({
          regu: reguItem,
          regu_id: reguItem._id,
          pangkalan: pangkalan,
          lomba: lombaItem,
          lomba_id: lombaItem._id,
          nilai: totalNilai,
          nilai_juara: totalJuara,
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
