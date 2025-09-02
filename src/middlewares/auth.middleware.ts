import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export interface AuthRequest extends Request {
  user?: { id: string; [key: string]: any };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    req.user = { id: decoded.userId }; // 👈 normalize it to `id` for all controllers
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
