import express from "express";
import { DeleteNilaiLomba } from "../nilaiLombaController/deleteNilaiLombaById";
import { editeNilaiLomba } from "../nilaiLombaController/editeNilaiLomba";
import { getAllNilaiLomba } from "../nilaiLombaController/getAllNilaiLomba";
import { postNilaiLomba } from "../nilaiLombaController/postNilaiLombal";
import { authenticateToken } from "../../../global/authenticateToken";
import { authorizeRoles } from "../../../global/authorizeRoles";
const router = express.Router();

router.post("/get", getAllNilaiLomba);
router.use(authenticateToken, authorizeRoles(['ADMIN']))
router.post("/", postNilaiLomba);
router.delete("/:id", DeleteNilaiLomba);
router.put("/:id", editeNilaiLomba);
export const nilaiLombaRouter = router;
