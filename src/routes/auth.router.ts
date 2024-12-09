import { Router } from "express";
import {
  ForgotPasswordController,
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
  ForgotPasswordController
);

export default router;
