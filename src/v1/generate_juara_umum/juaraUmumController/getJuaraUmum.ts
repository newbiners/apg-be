import { Request, Response } from "express";
import { juaraUmum } from "../juaraUmumModel/juaraUmumModel";
import { schools } from "../../schools/schoolsModel/schoolsModel";
import { User } from "../../users/usersModel/userModel";
import { roles } from "../../roles/rolesModel/rolesModel";
interface RequestBody {
    type: string; // Ganti `any` dengan tipe yang sesuai
    gender?: string; // Ganti `any` dengan tipe yang sesuai, jika opsional tetap gunakan tanda `?`
}

export const getJuaraUmum = async (
    req: Request<{}, {}, RequestBody>,
    res: Response
): Promise<void> => {
    try {
        const { gender, type } = req.body;

        if (!type) {
            res.status(400).json({ error: "Type is required." });
        }

        const filter: Partial<RequestBody> = { type };

        if (gender) {
            filter.gender = gender;
        }

        const getData = await juaraUmum.find(filter);

        var data_header: any[] = [];
        var data_detail: any[] = [];
        for (let i = 0; i < getData.length; i++) {
            if (!getData[i].header) {
                data_header.push(getData[i])
            } else {
                data_detail.push(getData[i])
            }
        }


        // // var data_finis = await Promise.all(
        // var data_finis = data_header.map(async (x) => {
        //         const school = await schools.findById(x.school);
        //         x.school = school;
        //         return x
        //     });
        // // );

        var data_finis: any[] = [];
        for (let i = 0; i < data_header.length; i++) {
            const school = await schools.findById(data_header[i].name.school);
            data_header[i].name.school = school;
            data_finis.push(data_header[i])
        }

        res.status(200).json({ data_detail: data_detail, data_header: data_finis });
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};


export const getJuaraUmumReguUser = async (
    req: Request<{}, {}, RequestBody>,
    res: Response
): Promise<void> => {
    try {
        const { gender, type } = req.body;

        if (!type) {
            res.status(400).json({ error: "Type is required." });
        }
        const rolesJuri = await roles.findOne({ name: "JURI" });

        const userJuri = await User.find({ role: rolesJuri && rolesJuri._id, active: true });

        if (userJuri.length > 0) {
            res.status(200).json([])
            return
        }



        const filter: Partial<RequestBody> = { type };

        if (gender) {
            filter.gender = gender;
        }

        const getData = await juaraUmum.find(filter);

        var data_header: any[] = [];
        var data_detail: any[] = [];
        for (let i = 0; i < getData.length; i++) {
            if (!getData[i].header) {
                data_header.push(getData[i])
            } else {
                data_detail.push(getData[i])
            }
        }


        // // var data_finis = await Promise.all(
        // var data_finis = data_header.map(async (x) => {
        //         const school = await schools.findById(x.school);
        //         x.school = school;
        //         return x
        //     });
        // // );

        var data_finis: any[] = [];
        for (let i = 0; i < data_header.length; i++) {
            const school = await schools.findById(data_header[i].name.school);
            data_header[i].name.school = school;
            data_finis.push(data_header[i])
        }


        // var data_detail_finis: any[] = [];
        // for (let i = 0; i < data_detail.length; i++) {
        //     const school = await schools.findById({ _id: data_detail[i].header.school });
        //     var key = data_detail[i].header.name + "-" + school && school?.name || "";
        //     data_detail[key.toString()].push(data_detail[i])
        // }

        var data_detail_finis: { [key: string]: any[] } = {};
        for (let i = 0; i < data_detail.length; i++) {
            const school = await schools.findById({ _id: data_detail[i].header.school });
            const school_name = school && school?.name || "";
            var key = data_detail[i].header.name + "-" + school_name;
            if (!data_detail_finis[key.toString()]) {
                data_detail_finis[key.toString()] = [];
            }
            data_detail_finis[key.toString()].push(data_detail[i])
        }

        res.status(200).json({ data_detail: data_detail_finis, data_header: data_finis });
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};



export const getJuaraUmumPangkalanUser = async (
    req: Request<{}, {}, RequestBody>,
    res: Response
): Promise<void> => {
    try {
        const { gender, type } = req.body;

        if (!type) {
            res.status(400).json({ error: "Type is required." });
        }
        const rolesJuri = await roles.findOne({ name: "JURI" });

        const userJuri = await User.find({ role: rolesJuri && rolesJuri._id, active: true });

        if (userJuri.length > 0) {
            res.status(200).json([])
        }



        const filter: Partial<RequestBody> = { type };

        if (gender) {
            filter.gender = gender;
        }

        const getData = await juaraUmum.find(filter);

        var data_header: any[] = [];
        var data_detail: any[] = [];
        for (let i = 0; i < getData.length; i++) {
            if (!getData[i].header) {
                data_header.push(getData[i])
            } else {
                data_detail.push(getData[i])
            }
        }


        // // var data_finis = await Promise.all(
        // var data_finis = data_header.map(async (x) => {
        //         const school = await schools.findById(x.school);
        //         x.school = school;
        //         return x
        //     });
        // // );

        var data_finis: any[] = [];
        for (let i = 0; i < data_header.length; i++) {
            const school = await schools.findById(data_header[i].name.school);
            data_header[i].name.school = school;
            data_finis.push(data_header[i])
        }


        // var data_detail_finis: any[] = [];
        // for (let i = 0; i < data_detail.length; i++) {
        //     const school = await schools.findById({ _id: data_detail[i].header.school });
        //     var key = data_detail[i].header.name + "-" + school && school?.name || "";
        //     data_detail[key.toString()].push(data_detail[i])
        // }

        var data_detail_finis: { [key: string]: any[] } = {};
        for (let i = 0; i < data_detail.length; i++) {
            var key = data_detail[i].header.name
            if (!data_detail_finis[key.toString()]) {
                data_detail_finis[key.toString()] = [];
            }
            data_detail_finis[key.toString()].push(data_detail[i])
        }

        res.status(200).json({ data_detail: data_detail_finis, data_header: data_finis });
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

