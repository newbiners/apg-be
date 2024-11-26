import express from "express";
import { DeleteNilaiLombaDeta } from "../nilaiLombaDetailController/deleteNilaiLombaById";
import { editNilaiLomba } from "../nilaiLombaDetailController/editeNilaiLomba";
import { getAllNilaiLombaDetail } from "../nilaiLombaDetailController/getAllNilaiLombaDetail";
import { postNilaiLombaDetail } from "../nilaiLombaDetailController/postNilaiLombal";
import { authenticateToken } from "../../../global/authenticateToken";
import { authorizeRoles } from "../../../global/authorizeRoles";
const router = express.Router();

router.get("/:id", getAllNilaiLombaDetail);
router.use(authenticateToken, authorizeRoles(['ADMIN']))
router.post("/", postNilaiLombaDetail);
router.delete("/:id", DeleteNilaiLombaDeta);
router.put("/:id", editNilaiLomba);
export const nilaiLombaDetailRouter = router;
