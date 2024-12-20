import express from "express";
import { postNilaiLomba } from "../nilaiJuriController/postNilaiJuri";
import { getNilaiJuri } from "../nilaiJuriController/getNilaiJuri";
import { getNilaiJuriByAdmin } from "../nilaiJuriController/getNilaiJuriByAdmin";
import { DeleteNilaiJuri } from "../nilaiJuriController/deleteNilaiJuri";
import { authenticateToken } from "../../../global/authenticateToken";
import { authorizeRoles } from "../../../global/authorizeRoles";
const router = express.Router();

// router.use(authenticateToken, authorizeRoles(['JURI']))
router.post("/", postNilaiLomba);
router.post("/get", getNilaiJuri);
router.post("/get-by-admin", getNilaiJuriByAdmin);
router.delete("/delete/:id", DeleteNilaiJuri)
export const nilaiJuriRouter = router;
