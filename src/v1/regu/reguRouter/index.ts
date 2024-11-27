import express from "express";
import { GetAllRegu } from "../reguController/getAllRegu";
import { PostRegu } from "../reguController/postRegu";
import { DeleteRoles } from "../reguController/deleteReguById";
import { EditRegu } from "../reguController/editRegu";
import { getReguBySchool } from "../reguController/getReguBySchool";
import { GetSearchRegu } from "../reguController/getSearchRegu";
import { authenticateToken } from '../../../global/authenticateToken';
import { authorizeRoles } from "../../../global/authorizeRoles";
const router = express.Router();

router.get("/", GetAllRegu);
router.get("/search", GetSearchRegu)
router.post("/get-by-school", getReguBySchool);
router.use(authenticateToken, authorizeRoles(['ADMIN']))
router.post("/", PostRegu);
router.delete("/:id", DeleteRoles);
router.put("/:id", EditRegu);
export const reguRouter = router;
