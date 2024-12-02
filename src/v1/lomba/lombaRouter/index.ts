import express from "express";
import { DeleteLomba } from "../lombaController/deleteLombaById";
import { EditLomba } from "../lombaController/editeLomba";
import { GetAllLomba } from "../lombaController/getAllLomba";
import { PostLomba } from "../lombaController/postLomba";
import { authenticateToken } from "../../../global/authenticateToken";
import { authorizeRoles } from "../../../global/authorizeRoles";
const router = express.Router();

router.get("/", GetAllLomba);
router.use(authenticateToken, authorizeRoles(['ADMIN', 'JURI']))
router.post("/", PostLomba);
router.delete("/:id", DeleteLomba);
router.put("/:id", EditLomba);
export const lombaRouter = router;
