import { z } from "zod";
import { normalizeUgandaPhone } from "./phone";

export const phoneField = z
  .string()
  .trim()
  .min(1, { error: "Phone number is required." })
  .transform((value, ctx) => {
    const normalized = normalizeUgandaPhone(value);
    if (!normalized) {
      ctx.addIssue({ code: "custom", message: "Enter a valid Ugandan phone number." });
      return z.NEVER;
    }
    return normalized;
  });

export const passwordField = z
  .string()
  .min(8, { error: "Password must be at least 8 characters." })
  .regex(/[a-zA-Z]/, { error: "Password must contain at least one letter." })
  .regex(/[0-9]/, { error: "Password must contain at least one number." });

const otpField = z
  .string()
  .trim()
  .regex(/^\d{6}$/, { error: "Enter the 6-digit code." });

export const LoginSchema = z.object({
  phone: phoneField,
  password: z.string().min(1, { error: "Enter your password." }),
});

export const RequestOtpSchema = z.object({
  phone: phoneField,
});

export const ResetPasswordSchema = z
  .object({
    phone: phoneField,
    code: otpField,
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });
