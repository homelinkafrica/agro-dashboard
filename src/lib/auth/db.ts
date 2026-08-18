import "server-only";
import { randomUUID } from "node:crypto";
import { hashPassword } from "./password";
import type { OtpPurpose, User } from "./types";

/**
 * In-memory mock "database" so the auth flow works end-to-end without a
 * backend. Data resets whenever the server process restarts.
 *
 * TODO: replace with real persistence (e.g. calls to the agro-backend API).
 */

const TRIAL_LENGTH_DAYS = 30;
const OTP_LENGTH = 6;
const OTP_TTL_MS = 5 * 60 * 1000;

type OtpRecord = {
  code: string;
  expiresAt: number;
};

const users: User[] = [];
const otpsByKey = new Map<string, OtpRecord>();

function otpKey(phone: string, purpose: OtpPurpose): string {
  return `${purpose}:${phone}`;
}

export function findUserByPhone(phone: string): User | undefined {
  return users.find((user) => user.phone === phone);
}

export function findUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

export function createUser(input: {
  fullName: string;
  phone: string;
  email: string | null;
  password: string;
}): User {
  const now = new Date();
  const trialEndsAt = new Date(now.getTime() + TRIAL_LENGTH_DAYS * 24 * 60 * 60 * 1000);

  const user: User = {
    id: randomUUID(),
    fullName: input.fullName,
    phone: input.phone,
    email: input.email,
    address: "Uganda",
    phoneVerified: false,
    passwordHash: hashPassword(input.password),
    createdAt: now.toISOString(),
    trialEndsAt: trialEndsAt.toISOString(),
  };

  users.push(user);
  return user;
}

export function markPhoneVerified(userId: string): void {
  const user = users.find((u) => u.id === userId);
  if (user) user.phoneVerified = true;
}

export function updateUserPassword(userId: string, passwordHash: string): void {
  const user = users.find((u) => u.id === userId);
  if (user) user.passwordHash = passwordHash;
}

/** Generates and stores a fresh OTP for the given phone + purpose, returning the code. */
export function issueOtp(phone: string, purpose: OtpPurpose): string {
  const code = Array.from({ length: OTP_LENGTH }, () => Math.floor(Math.random() * 10)).join("");
  otpsByKey.set(otpKey(phone, purpose), { code, expiresAt: Date.now() + OTP_TTL_MS });

  // No SMS provider is wired up yet, so surface the code server-side for local testing.
  console.log(`[dev] OTP for ${phone} (${purpose}): ${code}`);

  return code;
}

export function verifyOtp(phone: string, purpose: OtpPurpose, code: string): boolean {
  const key = otpKey(phone, purpose);
  const record = otpsByKey.get(key);
  if (!record) return false;

  const isValid = record.code === code && record.expiresAt > Date.now();
  if (isValid) otpsByKey.delete(key);

  return isValid;
}
