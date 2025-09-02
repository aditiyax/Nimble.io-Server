// src/controllers/chat.controller.ts
import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ChatModel } from "../models/chatModels";
import { chatService } from "../services/chat.service";

// POST /api/chats/template
export const TemplateController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { prompt } = req.body;

    const template = await chatService.template(userId!, prompt);
    console.log("template in controller", prompt);

    return res.status(200).json({ success: true, template });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Template create failed",
      error: err.message,
    });
  }
};

export const CreateChatController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { messages } = req.body;

    const chat = await chatService.createChat(userId!, messages);
    console.log("messages in controller", messages);
    return res.status(201).json({ success: true, chat });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Chat create failed",
      error: err.message,
    });
  }
};

// // GET /api/chats/get-chat-history?limit=50
// export const GetChatsController = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user.id;
//     const limit = Math.min(parseInt(String(req.query.limit ?? "50"), 10), 100);

//     const chats = await ChatModel.find({ userId })
//       .sort({ createdAt: -1 })
//       .limit(Number.isNaN(limit) ? 50 : limit);

//     return res.status(200).json({ success: true, chats });
//   } catch (err: any) {
//     return res.status(500).json({ success: false, message: "Fetch chats failed", error: err.message });
//   }
// };

// // DELETE /api/chats/delete-chat?chatId=...
// // (also accepts chatId in body for convenience)
// export const DeleteChatController = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user.id;
//     const chatId = (req.query.chatId as string) || (req.body?.chatId as string);

//     if (!chatId) {
//       return res.status(400).json({ success: false, message: "chatId is required" });
//     }

//     const deleted = await ChatModel.findOneAndDelete({ _id: chatId, userId });
//     if (!deleted) {
//       return res.status(404).json({ success: false, message: "Chat not found or not authorized" });
//     }

//     return res.status(200).json({ success: true, message: "Chat deleted successfully" });
//   } catch (err: any) {
//     return res.status(500).json({ success: false, message: "Delete chat failed", error: err.message });
//   }
// };
