import { Request, Response } from "express";
import { juaraUmum } from "../juaraUmumModel/juaraUmumModel";
import { regu } from "../../regu/reguModel/reguModel";
interface RequestBody {
  type: string; // Ganti `any` dengan tipe yang sesuai
  gender?: string; // Ganti `any` dengan tipe yang sesuai, jika opsional tetap gunakan tanda `?`
}

export const postJuaraUmumRegu = async (
  req: Request<{}, {}, RequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { gender, type } = req.body;

    if (!type) {
      res.status(400).json({ error: "Type is required." });
    }

    const filter: Partial<RequestBody> = { type, gender };

    const filterRegu = {
      gender: gender,
    }

    await juaraUmum.deleteMany(filter);

    const regu_data = await regu.find(filterRegu);

    res.status(200).json(regu_data);

    const getData = await juaraUmum.find(filter);

    res.status(200).json(getData);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
