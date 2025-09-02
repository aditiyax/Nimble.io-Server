require("dotenv").config();
import { GoogleGenAI } from "@google/genai";
import { getSystemPrompt, REACT_BLRPT_PROMPT } from "../utils/prompts";
import { reactBasePrompt } from "../utils/defaults/react";
import { nodeBasePrompt } from "../utils/defaults/node";
import { UserModel } from "../models/userModel";
import { ChatModel } from "../models/chatModels";

class ChatService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY as string,
    });
  }

  // async template(userId: string, prompt: string) {
  //   try {
  //     // const user = await UserModel.findById(userId).select("-password");
  //     // if (!user) {
  //     //   return { error: "User not found" };
  //     // }
  //     let result;

  //     const response = await this.ai.models.generateContent({
  //       model: "gemini-2.5-flash",
  //       contents: prompt,
  //       config: {
  //         systemInstruction: `Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra`,
  //         maxOutputTokens: 50,
  //         temperature: 0.1  ,
  //           // `You are an expert project type classifier. Given a project description, analyze whether it should be implemented as a 'react' (frontend) or 'node' (backend) application. 
  //           //   Return only a single word: either 'react' or 'node'. 
  //           //   - If the description clearly requires backend/server-side logic, return 'node'.
  //           //   - If the description is for a user interface, web app, or can be built entirely with React, return 'react'.
  //           //   - If the description is ambiguous, not specified, or could be either, default to 'react'.
  //           //   Do not include any explanation, punctuation, or extra words. Only output 'react' or 'node'.`,
  //       },
  //     });
  //     console.log("response", response);
  //     const answer = response.text; //react or node
  //     if (answer == "react") {
  //       console.log("REACT project received");
  //       const res = { prompts: [REACT_BLRPT_PROMPT, reactBasePrompt] };
  //       return (result = res);
  //     } else if (answer == "node") {
  //       console.log("NODE project received");
  //       const res = { prompts: [nodeBasePrompt] };
  //       return (result = res);
  //     } else {
  //       console.log("NOT_SUPPORTED received");
  //       const res = {
  //         message:
  //           "Code Language Not Supported, Pls provide 'react' or 'node' code! ",
  //       };
  //       return (result = res);
  //     }
  //   } catch (error) {
  //     console.error("Template Error:", error);
  //     throw new Error("Failed to create template");
  //   }
  // }

  async template(userId: string, prompt: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
        systemInstruction:  `Return either "node" or "react" based on what you think this project should be. 
                    Only return a single word: either 'node' or 'react'. Do not return anything extra.`
      }
      });
  
      const answer =
        response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toLowerCase();
  
      if (answer === "react") {
        console.log("REACT project received");
        return { prompts: [REACT_BLRPT_PROMPT, reactBasePrompt] };
      } else if (answer === "node") {
        console.log("NODE project received");
        return { prompts: [nodeBasePrompt] };
      } else {
        console.log("NOT_SUPPORTED received");
        return {
          message:
            "Code Language Not Supported, Pls provide 'react' or 'node' code! "
        };
      }
    } catch (error) {
      console.error("Template Error:", error);
      throw new Error("Failed to create template");
    }
  }
  

  async createChat(userId: string, messages: string[], attachments?: string[]) {
    try {
      // const user = await UserModel.findById(userId).select("-password");
      // if (!user) {
      //   return { error: "User not found" };
      // }

      const response = await this.ai.models.generateContentStream({
        model: "gemini-2.5-pro",
        contents: messages,
        config: {
          systemInstruction: getSystemPrompt(),
          maxOutputTokens: 2000,
        },
      });

      let fullTextResponse = "";
      console.log("--- Streaming Response Start ---");
      for await (const chunk of response) {
        fullTextResponse += chunk.text;
        console.log(chunk.text);
      }
      console.log("--- Streaming Response End ---");

      // const chatResponse = await ChatModel.create({
      //   userId: userId,
      //   body: messages[messages.length - 1],
      //   attachments: attachments,
      // });
      return {
        success: true,
        message: "Chat created",
        response: fullTextResponse,
      };
    } catch (error) {
      console.error("Chat.service.ts -- Gemini-API Error:", error);
      throw new Error("Failed to create chat");
    }
  }
}

export const chatService = new ChatService();
