import express from "express";
import { DeleteSchool } from "../schoolsController/deleteSchool";
import { schoolPost } from "../schoolsController/schoolPost";
import { GetAllSchools } from "../schoolsController/getAllSchools";
import { GetSchoolById } from "../schoolsController/getSchoolById";
import { EditSchool } from "../schoolsController/schoolEdit";
import { GetSearchSchool } from "../schoolsController/getSearchSchool";
import { authenticateToken } from '../../../global/authenticateToken';
import { authorizeRoles } from "../../../global/authorizeRoles";
const router = express.Router();

router.get("/", GetAllSchools);
router.get("/search", GetSearchSchool)
router.use(authenticateToken, authorizeRoles(['ADMIN']))
router.post("/", schoolPost);
router.put("/:id", EditSchool);
// router.delete('/:id', DeleteUser);
router.delete("/:id", DeleteSchool);
router.get("/:id", GetSchoolById);

export const schoolRouter = router;
