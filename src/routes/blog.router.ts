import { Router } from "express";
import {
  createBlogController,
  getBlogController,
  getBlogsController,
} from "../controller/blog.controller";
import { uploader } from "../lib/multer";
import { fileFilter } from "../lib/fileFilter";
import { validateCreateBlog } from "../validators/blog.validator";
import { verifyToken } from "../lib/jwt";

const router = Router();

router.get("/", getBlogsController);
router.get("/:id", getBlogController);
router.post(
  "/",
  verifyToken,
  uploader().fields([{ name: "thumbnail", maxCount: 1 }]),
  fileFilter,
  validateCreateBlog,
  createBlogController
);

export default router;
