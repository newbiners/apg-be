import express from "express";
import { postJuaraUmumRegu } from "../juaraUmumController/postJuaraUmumRegu";
import { getJuaraUmum, getJuaraUmumPangkalanUser, getJuaraUmumReguUser } from "../juaraUmumController/getJuaraUmum";
import { postJuaraUmumPangkalan } from "../juaraUmumController/postJuaraUmumPangkalan";
import { authenticateToken } from "../../../global/authenticateToken";
import { authorizeRoles } from "../../../global/authorizeRoles";
const router = express.Router();
router.post("/get/regu", getJuaraUmumReguUser);
router.post("/get/pangkalan", getJuaraUmumPangkalanUser);
// router.use(authenticateToken, authorizeRoles(['JURI']))
router.post("/regu", postJuaraUmumRegu);
router.post("/pangkalan", postJuaraUmumPangkalan);
router.post("/get", getJuaraUmum);
export const juaraUmumRouter = router;
