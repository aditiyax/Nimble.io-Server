import express from "express";
import {
  LoginController,
  PasswordRestController,
  SignupController,
} from "../controller/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  CreateChatController,
  TemplateController,
} from "../controller/chat.controller";
import {
  DeleteUserController,
  GetUserController,
  UpdateUserController,
} from "../controller/user.controller";

// Auth Routes
export const authRoutes = express.Router();
authRoutes.post("/signup", SignupController);
authRoutes.post("/login", LoginController);
authRoutes.post("/pass-reset", authMiddleware, PasswordRestController);

// User Routes
export const userRoutes = express.Router();

userRoutes.get("/getUser", authMiddleware, GetUserController);
userRoutes.put("/updateUser", authMiddleware, UpdateUserController);
userRoutes.delete("/deleteUser", authMiddleware, DeleteUserController);

// Chat Routes
export const chatRoutes = express.Router();
chatRoutes.post(
  "/template",
  // authMiddleware,
  TemplateController
);

chatRoutes.post(
  "/chat",
  // authMiddleware,
  CreateChatController
);
// chatRoutes.get("/get-chat-history", authMiddleware, GetChatsController);
// chatRoutes.delete("/delete-chat", authMiddleware, DeleteChatController);
