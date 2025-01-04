import { User } from "../usersModel/userModel"
import { Request, Response } from "express"
import { getRole, getlomba } from "./getAllUser"
import { nilaiJuri } from "../../nilaiJuri/nilaiJuriModel/nilaiJuriModel"
import { nilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel"
import { nilaiLombaDetail } from "../../nilaiLombaDetail/nilaiLombaDetailModel/nilaiLombaDetailModel"
import { regu } from "../../regu/reguModel/reguModel"
import { schools } from "../../schools/schoolsModel/schoolsModel"
export const DeleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const deleteUser = await User.findByIdAndDelete({ _id: id });



        if (deleteUser == null) {
            res.status(400).json({ message: "User not found" })
        }

        // menghitung kembali nilai limba
        const nilaiJuriData = await nilaiJuri.find({ create: id });
        await nilaiJuri.deleteMany({ create: id });

        var nilaiLombaDetailId: string[] = nilaiJuriData.map((nilai) => nilai.nilai_lomba_detail_id.toString());
        var nilaiLombaId: string[] = nilaiJuriData.map((nilai) => nilai.nilai_lomba_id.toString());
        var reguId: string[] = nilaiJuriData.map((nilai) => nilai.regu.toString());
        var schoolId: string[] = nilaiJuriData.map((nilai) => nilai.school.toString());


        const nilaiLombaDetailData = await nilaiLombaDetail.find({ _id: { $in: nilaiLombaDetailId } });

        for (let i = 0; i < nilaiLombaDetailData.length; i++) {
            // const lombaDetailId = nilaiLombaDetailData[i].lomba_detail;
            // await nilaiLomba.deleteMany({ lomba_detail: lombaDetailId });
            const nilaiJuriD = await nilaiJuri.find({ nilai_lomba_detail_id: nilaiLombaDetailData[i]._id, nilai_lomba_id: nilaiLombaDetailData[i].header });
            let total = 0;
            for (let j = 0; j < nilaiJuriD.length; j++) {
                total += nilaiJuriD[j].nilai;
            }
            await nilaiLombaDetail.findByIdAndUpdate(nilaiLombaDetailData[i]._id, { nilai: total }, { new: true });
        }

        // res.status(400).json({ message: "test 1" })
        const nilaiLombaData = await nilaiLomba.find({ _id: { $in: nilaiLombaId } });

        for (let i = 0; i < nilaiLombaData.length; i++) {
            const nilaiLombaId = nilaiLombaData[i]._id;
            const nilaiLombaDetailD = await nilaiLombaDetail.find({ header: nilaiLombaId });
            let total = 0;
            for (let j = 0; j < nilaiLombaDetailD.length; j++) {
                total += nilaiLombaDetailD[j].nilai;
            }
            await nilaiLomba.findByIdAndUpdate(nilaiLombaId, { nilai: total }, { new: true });
        }
        // res.status(400).json({ message: "test 2" })
        const Regu = await regu.find({ _id: { $in: reguId } });
        // let totalRegu = 0;
        for (let i = 0; i < Regu.length; i++) {
            const reguId = Regu[i]._id;
            const nilaiLombaData = await nilaiLomba.find({ regu: reguId, type: "regu" });
            let totalRegu = 0;
            for (let j = 0; j < nilaiLombaData.length; j++) {
                totalRegu += nilaiLombaData[j].nilai;
            }
            await regu.findByIdAndUpdate(reguId, { nilai: totalRegu }, { new: true });
        }

        const Sekolah = await schools.find({ _id: { $in: schoolId } });
        for (let i = 0; i < Sekolah.length; i++) {
            const schoolId = Sekolah[i]._id;
            const nilaiLombaData = await nilaiLomba.find({ regu: schoolId, type: "pangkalan" });
            let totalSchool = 0;
            for (let j = 0; j < nilaiLombaData.length; j++) {
                totalSchool += nilaiLombaData[j].nilai;
            }
            await schools.findByIdAndUpdate(schoolId, { nilai: totalSchool }, { new: true });
        }

        res.status(400).json({ message: "test 3" })
        const getRoles = await getRole();

        const getUser = await User.find();

        const lomba_id: string[] = getUser.map((user) => user.lomba && user.lomba.toString());
        // res.status(200).json(lomba_id);

        // Fetch related lomba data
        const lombaReturn: any = await getlomba(lomba_id);
        // res.status(200).json(lombaReturn);


        // Map users with roles and lomba
        const usersWithRoles = getUser.map((user) => {
            const userWithRole = user.toObject(); // Convert Mongoose document to plain object
            userWithRole.role = getRoles[user.role.toString()] || null; // Assign role or null if not found
            userWithRole.lomba = user.lomba ? lombaReturn[user.lomba.toString()] || null : null; 
            return userWithRole;
        });



        res.status(200).json(usersWithRoles);
    } catch (err) {
        console.log(err)
    }
}