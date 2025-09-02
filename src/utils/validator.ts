// src/validators/validators.ts
import Joi from "joi";
// import { Request, Response, NextFunction } from "express";

// export const validate =
//   (schema: Joi.ObjectSchema) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     const { value, error } = schema.validate(req.body, {
//       abortEarly: false,
//       allowUnknown: false,
//       stripUnknown: true, // sanitize extras
//     });

//     if (error) {
//       return res.status(422).json({
//         message: "Validation error",
//         errors: error.details.map((d) => ({
//           message: d.message,
//           path: d.path,
//         })),
//       });
//     }

//     req.body = value;
//     next();
//   };

// ---------------------- AUTH VALIDATORS ----------------------

// Signup
export const signupValidator = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  github: Joi.string().uri().optional(),
  website: Joi.string().uri().optional(),
  bio: Joi.string().max(500).optional(),
});

// Login
export const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Password Reset
export const passwordResetValidator = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().min(6).required(),
});

// ---------------------- USER VALIDATORS ----------------------

// Get User by ID
export const getUserValidator = Joi.object({
  userId: Joi.string().required(),
});

// Update User
export const updateUserValidator = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  github: Joi.string().uri().optional(),
  website: Joi.string().uri().optional(),
  bio: Joi.string().max(500).optional(),
});

// Delete User
export const deleteUserValidator = Joi.object({
  userId: Joi.string().required(),
});

// ---------------------- CHAT VALIDATORS ----------------------

// Chat Template Creation
