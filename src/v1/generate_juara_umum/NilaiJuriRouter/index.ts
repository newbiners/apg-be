import express from "express";
import { postJuaraUmumRegu } from "../juaraUmumController/postJuaraUmumRegu";
import { getJuaraUmum } from "../juaraUmumController/getJuaraUmum";
import { postJuaraUmumPangkalan } from "../juaraUmumController/postJuaraUmumPangkalan";
import { authenticateToken } from "../../../global/authenticateToken";
import { authorizeRoles } from "../../../global/authorizeRoles";
const router = express.Router();

// router.use(authenticateToken, authorizeRoles(['JURI']))
router.post("/regu", postJuaraUmumRegu);
router.post("/pangkalan", postJuaraUmumPangkalan);
router.post("/get", getJuaraUmum);
export const juaraUmumRouter = router;
