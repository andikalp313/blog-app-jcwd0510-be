import { Router } from "express";
import { getSamplesController } from "../controller/sample.controller";

const router = Router();

router.get("/", getSamplesController);

export default router;
