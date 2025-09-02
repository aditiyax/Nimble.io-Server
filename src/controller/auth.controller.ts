import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

// --- Signup ---
export const SignupController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, github, website, bio } = req.body;

    // Check existing user
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      github,
      website,
      bio,
    });

    const safe = user.toObject();
    delete (safe as any).password;

    return res
      .status(201)
      .json({ success: true, message: "User registered", user: safe });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: "Signup failed", error: err.message });
  }
};

// --- Login ---
export const LoginController = async (req: Request, res: Response) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET not configured");

    const { email, password } = req.body;

    // Find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check password
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1d",
    });

    const safe = user.toObject();
    delete (safe as any).password;

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: safe,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: "Login failed", error: err.message });
  }
};

// --- Password Reset ---
export const PasswordRestController = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({ success: true, message: "Password reset successful" });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Password reset failed",
      error: err.message,
    });
  }
};
