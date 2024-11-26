import { Request, Response } from "express";
import { schools } from "../../schools/schoolsModel/schoolsModel";
import { lomba as lombadb } from "../../lomba/lombaModel/lombaModel";
import { nilaiJuri } from "../nilaiJuriModel/nilaiJuriModel";
import { nilaiLombaDetail } from "../../nilaiLombaDetail/nilaiLombaDetailModel/nilaiLombaDetailModel";
import { nilaiLomba } from "../../nilaiLomba/nilaiLombaModel/nilaiLombaModel";
import { get } from "mongoose";
import { regu } from "../../regu/reguModel/reguModel";
export const postNilaiLomba = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { school, regu, lomba, nilai, lomba_detail, create, nilai_lomba_id, nilai_lomba_detail_id } = req.body;

    const removeData = await nilaiJuri.deleteMany({
      school: school,
      regu: regu,
      lomba: lomba,
      lomba_detail: lomba_detail,
      create: create,
      nilai_lomba_id: nilai_lomba_id,
      nilai_lomba_detail_id: nilai_lomba_detail_id
    })


    const dataLomba = await lombadb.findById(lomba);
    const newNilaiLomba = new nilaiJuri({
      school,
      regu,
      lomba,
      nilai,
      type: (dataLomba && dataLomba?.type) || "",
      lomba_detail,
      create,
      nilai_lomba_id: nilai_lomba_id,
      nilai_lomba_detail_id: nilai_lomba_detail_id
    });
    await newNilaiLomba.save();

    const getNilaiLomba = await nilaiJuri.find({
      school: school,
      regu: regu,
      lomba: lomba,
      lomba_detail: lomba_detail,
      create: create,
      nilai_lomba_id: nilai_lomba_id,
      nilai_lomba_detail_id: nilai_lomba_detail_id
    });

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


const createNilaiLombaDetail = async (data: any) => {
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


const createNilaiLomba = async (data: any) => {
  const nilaiDataJuri = await nilaiJuri.find({
    nilai_lomba_id: data.nilai_lomba_id
  })

  var nilai = 0;
  for (let i = 0; i < nilaiDataJuri.length; i++) {
    nilai += nilaiDataJuri[i].nilai
  }
  const nilai_lomba = await nilaiLomba.findByIdAndUpdate(data.nilai_lomba_id, { nilai: nilai }, { new: true });
}


const createNilaiRegu = async (data: any) => {
  const nilaiDataJuri = await nilaiJuri.find({
    regu: data.regu._id,
    type: "regu"
  })

  var nilai = 0;
  for (let i = 0; i < nilaiDataJuri.length; i++) {
    nilai += nilaiDataJuri[i].nilai
  }
  const nilai_lomba = await regu.findByIdAndUpdate(data.regu._id, { nilai: nilai }, { new: true });
}



const createNilaiSchool = async (data: any) => {
  const nilaiDataJuri = await nilaiJuri.find({
    school: data.school._id,
    type: "pangkalan"
  })

  var nilai = 0;
  for (let i = 0; i < nilaiDataJuri.length; i++) {
    nilai += nilaiDataJuri[i].nilai
  }
  const nilai_lomba = await schools.findByIdAndUpdate(data.school._id, { nilai: nilai }, { new: true });
}


