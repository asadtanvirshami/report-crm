"use client";
import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export const registerSchema = z.object({
  firstName: z.string({
    required_error: "First name is required.",
  }),
  lastName: z.string({
    required_error: "Last name is required.",
  }),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});