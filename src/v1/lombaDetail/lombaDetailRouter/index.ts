import express from "express";
import { DeleteLombaDetail } from "../lombaDetailController/deleteLombaDetailById";
import { editeLombaDetail } from "../lombaDetailController/editeLombaDetail";
import { getAllLombaDetail } from "../lombaDetailController/getAllLombaDetail";
import { postLombaDetail } from "../lombaDetailController/postLombaDetail";
const router = express.Router();

router.get("/:id", getAllLombaDetail);
router.post("/", postLombaDetail);
router.delete("/:id", DeleteLombaDetail);
router.put("/:id", editeLombaDetail);
export const lombaDetailRouter = router;
