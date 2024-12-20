import { Request, Response } from "express";
import { schools } from "../../schools/schoolsModel/schoolsModel";
import { lomba as lombadb } from "../../lomba/lombaModel/lombaModel";
import { nilaiJuri } from "../nilaiJuriModel/nilaiJuriModel";
import { nilaiLombaDetail } from "../../nilaiLombaDetail/nilaiLombaDetailModel/nilaiLombaDetailModel";
import { nilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
import { User } from "../../users/usersModel/userModel";
import { get } from "mongoose";
import { regu } from "../../regu/reguModel/reguModel";
import jwt from 'jsonwebtoken';
export const postNilaiLomba = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { school, regu, lomba, nilai, lomba_detail, create, nilai_lomba_id, nilai_lomba_detail_id } = req.body;

    const token = create && create.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

    const user = await User.findOne({ _id: decoded.payload });

    if (!user) {
      res.status(400).json({ message: "User not found" })
    }

    var filter: any = {
      school: school,
      lomba: lomba,
      lomba_detail: lomba_detail,
      create: user && user._id || "",
      nilai_lomba_id: nilai_lomba_id,
      nilai_lomba_detail_id: nilai_lomba_detail_id
    }

    if (regu) {
      filter.regu = regu
    }

    const removeData = await nilaiJuri.deleteMany(filter);



    const dataLomba = await lombadb.findById(lomba);
    var filter2: any = {
      school,
      lomba,
      nilai,
      type: (dataLomba && dataLomba?.type) || "",
      lomba_detail,
      create: user && user._id || "",
      nilai_lomba_id: nilai_lomba_id,
      nilai_lomba_detail_id: nilai_lomba_detail_id
    }

    if (regu) {
      filter2.regu = regu
    }
    const newNilaiLomba = new nilaiJuri(filter2);
    await newNilaiLomba.save();

    const getNilaiLomba = await nilaiJuri.find(filter);

    await createNilaiLombaDetail(req.body)
    await createNilaiLomba(req.body)
    await createNilaiRegu(req.body)
    await createNilaiSchool(req.body)


    res.status(200).json(getNilaiLomba);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};


export const createNilaiLombaDetail = async (data: any) => {
  const nilaiDataJuri = await nilaiJuri.find({
    nilai_lomba_detail_id: data.nilai_lomba_detail_id,
    nilai_lomba_id: data.nilai_lomba_id
  })

  var nilai = 0;
  for (let i = 0; i < nilaiDataJuri.length; i++) {
    nilai += nilaiDataJuri[i].nilai
  }
  const nilai_lomba = await nilaiLombaDetail.findByIdAndUpdate(data.nilai_lomba_detail_id, { nilai: nilai }, { new: true });
}


export const createNilaiLomba = async (data: any) => {
  const nilaiDataJuri = await nilaiJuri.find({
    nilai_lomba_id: data.nilai_lomba_id
  })

  var nilai = 0;
  for (let i = 0; i < nilaiDataJuri.length; i++) {
    nilai += nilaiDataJuri[i].nilai
  }
  const nilai_lomba = await nilaiLomba.findByIdAndUpdate(data.nilai_lomba_id, { nilai: nilai }, { new: true });
}


export const createNilaiRegu = async (data: any) => {
  const nilaiDataJuri = await nilaiJuri.find({
    regu: data.regu,
    type: "regu"
  })

  var nilai = 0;
  for (let i = 0; i < nilaiDataJuri.length; i++) {
    nilai += nilaiDataJuri[i].nilai
  }
  const nilai_lomba = await regu.findByIdAndUpdate(data.regu, { nilai: nilai }, { new: true });
}



export const createNilaiSchool = async (data: any) => {
  const nilaiDataJuri = await nilaiJuri.find({
    school: data.school,
    type: "pangkalan"
  })

  var nilai = 0;
  for (let i = 0; i < nilaiDataJuri.length; i++) {
    nilai += nilaiDataJuri[i].nilai
  }
  const nilai_lomba = await schools.findByIdAndUpdate(data.school, { nilai: nilai }, { new: true });
}


