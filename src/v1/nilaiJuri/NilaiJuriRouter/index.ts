import express from "express";
import { postNilaiLomba, getNilaiLombaTest } from "../nilaiJuriController/postNilaiJuri";
import { getNilaiJuri, getNilaiJuriSemu, getNilaiLombaDetail } from "../nilaiJuriController/getNilaiJuri";
import { getNilaiJuriByAdmin } from "../nilaiJuriController/getNilaiJuriByAdmin";
import { DeleteNilaiJuri } from "../nilaiJuriController/deleteNilaiJuri";
import { Reset } from "../nilaiJuriController/reset";
import { authenticateToken } from "../../../global/authenticateToken";
import { authorizeRoles } from "../../../global/authorizeRoles";
const router = express.Router();
router.use(authenticateToken, authorizeRoles(['JURI', 'ADMIN']))
router.post("/", postNilaiLomba);
router.post("/get", getNilaiJuri);
router.get("/get-semu", getNilaiJuriSemu);
router.get("/get-dd", getNilaiLombaDetail);
router.get("/test/:id", getNilaiLombaTest);
router.post("/get-by-admin", getNilaiJuriByAdmin);
router.delete("/delete/:id", DeleteNilaiJuri)
router.use(authenticateToken, authorizeRoles(['ADMIN']));
router.post("/reset", Reset);
export const nilaiJuriRouter = router;
