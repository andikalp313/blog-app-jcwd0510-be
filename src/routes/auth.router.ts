import { Router } from "express";
import {
  forgotPasswordController,
  LoginController,
  registerController,
} from "../controller/auth.controller";
import {
  validateForgotPassword,
  validateLogin,
  validateRegister,
} from "../validators/auth.validator";

const router = Router();

router.post("/register", validateRegister, registerController);
router.post("/login", validateLogin, LoginController);
router.post(
  "/forgot-password",
  validateForgotPassword,
  forgotPasswordController
);

export default router;
