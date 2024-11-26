import { Request, Response } from "express";
import { schools } from "../schoolsModel/schoolsModel";

export const GetSearchSchool = async (req: Request, res: Response): Promise<void> => {
    try {
        const search = req.query.search as string || ''; // Mengambil nilai dari query string
        const getSchools = await schools.find({
            name: { $regex: search, $options: "i" } // Menggunakan regex agar pencarian tidak case-sensitive
        });
        const sortegetSchools = getSchools.sort((a: any, b: any) => b.nilai - a.nilai);
        res.status(200).json(sortegetSchools);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while searching for schools." });
    }
};
