"use client";
import { z } from "zod";

export const mailSchema = z.object({
  email: z
    .string({
      required_error: "Subject is required.",
    })
    .email(),
  subject: z
    .string({
      required_error: "Subject is required.",
    }),
  message: z
    .string()
    .min(6, { message: "Message must be at least 6 characters." }),
});
