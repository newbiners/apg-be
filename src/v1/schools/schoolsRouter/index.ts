import express from "express";
import { DeleteSchool } from "../schoolsController/deleteSchool";
import { schoolPost } from "../schoolsController/schoolPost";
import { GetAllSchools } from "../schoolsController/getAllSchools";
import { GetSchoolById } from "../schoolsController/getSchoolById";
import { EditSchool } from "../schoolsController/schoolEdit";
import { GetSearchSchool } from "../schoolsController/getSearchSchool";
import { authenticateToken } from '../../../global/authenticateToken';
const router = express.Router();

router.get("/", GetAllSchools);
router.get("/search", GetSearchSchool)
router.post("/",authenticateToken, schoolPost);
router.put("/:id",authenticateToken, EditSchool);
// router.delete('/:id', DeleteUser);
router.delete("/:id",authenticateToken,DeleteSchool);
router.get("/:id", authenticateToken,GetSchoolById);

export const schoolRouter = router;
