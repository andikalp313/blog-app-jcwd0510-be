import { Router } from "express";
import { getBlogsController } from "../controller/blog.controller";

const router = Router();

router.get("/", getBlogsController);

export default router;
