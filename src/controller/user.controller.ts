// src/controllers/userController.ts
import { Response } from "express";
import { UserModel } from "../models/userModel";
import { AuthRequest } from "../middlewares/auth.middleware";

export const GetUserController = async (req: AuthRequest, res: Response) => {
  try {
    // ✅ Use the id from authMiddleware-attached req.user
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error("GetUserController Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Update User Profile
export const UpdateUserController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const { name, email } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user: updatedUser });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Delete User
export const DeleteUserController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
