import express from "express";
import { postNilaiLomba } from "../nilaiJuriController/postNilaiJuri";
import { getNilaiJuri } from "../nilaiJuriController/getNilaiJuri";
import { authenticateToken } from "../../../global/authenticateToken";
import { authorizeRoles } from "../../../global/authorizeRoles";
const router = express.Router();

// router.use(authenticateToken, authorizeRoles(['JURI']))
router.post("/", postNilaiLomba);
router.post("/get", getNilaiJuri);
export const nilaiJuriRouter = router;
