import express from "express";
import { DeleteLomba } from "../lombaController/deleteLombaById";
import { EditLomba } from "../lombaController/editeLomba";
import { GetAllLomba } from "../lombaController/getAllLomba";
import { PostLomba } from "../lombaController/postLomba";
import { authenticateToken } from "../../../global/authenticateToken";
import { authorizeRoles } from "../../../global/authorizeRoles";
import { Lomba } from "../lombaController/lomba";
import { exportExl } from "../lombaController/exportExl";
const router = express.Router();

router.post("/export", (req, res) => res.status(200).json({ message: "success" }));
router.post("/user", Lomba);
router.use(authenticateToken, authorizeRoles(['ADMIN', 'JURI']))
router.get("/", GetAllLomba);
router.post("/:id", GetAllLomba);
router.use(authenticateToken, authorizeRoles(['ADMIN']))
router.post("/", PostLomba);
router.delete("/:id", DeleteLomba);
router.put("/:id", EditLomba);
export const lombaRouter = router;
