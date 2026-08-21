"use server";

import { redirect } from "next/navigation";
import { createUser, findUserByPhone, issueOtp, updateUserPassword, verifyOtp } from "./db";
import { hashPassword, verifyPassword } from "./password";
import { createSession, deleteSession } from "./session";
import type { OtpPurpose } from "./types";
import { LoginSchema, RegisterSchema, RequestOtpSchema, ResetPasswordSchema } from "./validation";

export type ActionState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
      /** Non-sensitive submitted values, echoed back so the form can refill itself after an error. */
      values?: Record<string, string>;
    }
  | undefined;

const isDev = process.env.NODE_ENV !== "production";

function resetPasswordPath(phone: string, devOtp?: string) {
  const params = new URLSearchParams({ phone });
  if (isDev && devOtp) params.set("dev_otp", devOtp);
  return `/reset-password?${params.toString()}`;
}

export async function registerAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const raw = {
    fullName: String(formData.get("fullName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
  };

  const validated = RegisterSchema.safeParse({
    ...raw,
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors, values: raw };
  }

  const { fullName, phone, email, password } = validated.data;

  if (findUserByPhone(phone)) {
    return { errors: { phone: ["An account with this phone number already exists."] }, values: raw };
  }

  // Identity verification (SMS OTP, etc.) is the backend's responsibility —
  // this just creates the account and signs the user in directly.
  const user = createUser({ fullName, phone, email, password });
  await createSession(user.id);
  redirect("/");
}

export async function resendOtpAction(
  phone: string,
  purpose: OtpPurpose,
  _prevState: ActionState,
  _formData: FormData,
): Promise<ActionState> {
  const devOtp = issueOtp(phone, purpose);
  return { message: isDev ? `A new code was sent. (Dev code: ${devOtp})` : "A new code was sent." };
}

export async function loginAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const raw = { phone: String(formData.get("phone") ?? "") };

  const validated = LoginSchema.safeParse({
    ...raw,
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors, values: raw };
  }

  const { phone, password } = validated.data;
  const user = findUserByPhone(phone);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { message: "Incorrect phone number or password.", values: raw };
  }

  await createSession(user.id);
  redirect("/");
}

export async function requestPasswordResetAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const raw = { phone: String(formData.get("phone") ?? "") };
  const validated = RequestOtpSchema.safeParse(raw);

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors, values: raw };
  }

  const { phone } = validated.data;
  const user = findUserByPhone(phone);

  if (!user) {
    return { errors: { phone: ["No account found with that phone number."] }, values: raw };
  }

  const devOtp = issueOtp(phone, "reset-password");
  redirect(resetPasswordPath(phone, devOtp));
}

export async function resetPasswordAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const validated = ResetPasswordSchema.safeParse({
    phone: formData.get("phone"),
    code: formData.get("code"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { phone, code, password } = validated.data;

  if (!verifyOtp(phone, "reset-password", code)) {
    return { message: "That code is invalid or has expired." };
  }

  const user = findUserByPhone(phone);
  if (!user) {
    return { message: "We couldn't find that account." };
  }

  updateUserPassword(user.id, hashPassword(password));
  await createSession(user.id);
  redirect("/");
}

export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
