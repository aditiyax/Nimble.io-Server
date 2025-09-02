import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./userModel";

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  body: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema: Schema<IChat> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    body: { type: String, required: true },
    attachments: [{ type: String }],
  },
  { timestamps: true }
);

export const ChatModel: Model<IChat> =
  mongoose.models.Chat || mongoose.model<IChat>("Chat", ChatSchema);
