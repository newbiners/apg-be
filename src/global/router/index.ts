import express from "express";
import { userRouter } from "../../v1/users/usersRouter";
import { rolesRouter } from "../../v1/roles/rolesRouter";
import { schoolRouter } from "../../v1/schools/schoolsRouter";
import { reguRouter } from "../../v1/regu/reguRouter";
import { lombaRouter } from "../../v1/lomba/lombaRouter";
import { lombaDetailRouter } from "../../v1/lombaDetail/lombaDetailRouter";
import { nilaiLombaRouter } from "../../v1/nilaiLomba/NilaiLombaRouter";
import { nilaiLombaDetailRouter } from "../../v1/nilaiLombaDetail/NilaiLombaDetailRouter";
import { nilaiJuriRouter } from "../../v1/nilaiJuri/NilaiJuriRouter";
import { juaraUmumRouter } from "../../v1/generate_juara_umum/NilaiJuriRouter";
const router = express.Router();
router.use("/users", userRouter);
router.use("/roles", rolesRouter);
router.use("/schools", schoolRouter);
router.use("/regu", reguRouter);
router.use("/lomba", lombaRouter);
router.use("/lomba-detail", lombaDetailRouter);
router.use("/nilai-lomba", nilaiLombaRouter);
router.use("/nilai-lomba-detail", nilaiLombaDetailRouter);
router.use("/nilai-juri", nilaiJuriRouter)
router.use("/juara-umum", juaraUmumRouter)
export const Routers = router;
