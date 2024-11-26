import { schools } from "../schoolsModel/schoolsModel";
import { Request, Response } from "express";

export const EditSchool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Mendapatkan id dari parameter URL
    const { name, address, phone_number, email, nilai = 0 } = req.body;

    // res.status(200).json(req.body);

    // Mencari sekolah berdasarkan ID dan memperbarui datanya
    const updatedSchool = await schools.findByIdAndUpdate(
      id,
      {
        name,
        address,
        phone_number,
        email,
        nilai,
      },
      { new: true } // Mengembalikan dokumen yang sudah diperbarui
    );

    // Jika sekolah tidak ditemukan
    if (!updatedSchool) {
      res.status(404).json({ message: "School not found" });
    }

    // Mengirim respons dengan data sekolah yang diperbarui
    const getSchools = await schools.find();
    const sortegetSchools = getSchools.sort((a: any, b: any) => b.nilai - a.nilai);
    res.status(200).json(sortegetSchools);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while editing the school." });
  }
};
