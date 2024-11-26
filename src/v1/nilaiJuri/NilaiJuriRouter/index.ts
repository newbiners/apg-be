import express from "express";
import { postNilaiLomba } from "../nilaiJuriController/postNilaiJuri";
import { authenticateToken } from "../../../global/authenticateToken";
import { authorizeRoles } from "../../../global/authorizeRoles";
const router = express.Router();

// router.use(authenticateToken, authorizeRoles(['JURI']))
router.post("/", postNilaiLomba);
export const nilaiJuriRouter = router;
