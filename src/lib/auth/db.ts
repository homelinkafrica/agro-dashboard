import "server-only";
import { randomUUID } from "node:crypto";
import { hashPassword } from "./password";
import type {
  AccountType,
  Cooperative,
  CooperativeInvite,
  CooperativeStatus,
  OtpPurpose,
  ProviderProfile,
  User,
} from "./types";

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
const cooperatives: Cooperative[] = [];
const invites: CooperativeInvite[] = [];
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

/** First seeded/registered user, used as a fallback when login has no other identity to sign in as. */
export function getFirstUser(): User | undefined {
  return users[0];
}

export type CreateUserInput = {
  accountType: AccountType;
  fullName: string;
  phone: string;
  email: string | null;
  password: string;
  district?: string;
  subCounty?: string | null;
  preferredLanguage?: string;
  cooperativeId?: string | null;
  cooperativeStatus?: CooperativeStatus;
  providerProfile?: ProviderProfile | null;
};

export function createUser(input: CreateUserInput): User {
  const now = new Date();
  const trialEndsAt = new Date(now.getTime() + TRIAL_LENGTH_DAYS * 24 * 60 * 60 * 1000);
  const district = input.district ?? "";
  const subCounty = input.subCounty ?? null;

  const user: User = {
    id: randomUUID(),
    accountType: input.accountType,
    fullName: input.fullName,
    phone: input.phone,
    email: input.email,
    district,
    subCounty,
    address: [subCounty, district].filter(Boolean).join(", ") || "Uganda",
    preferredLanguage: input.preferredLanguage ?? "en",
    cooperativeId: input.cooperativeId ?? null,
    cooperativeStatus: input.cooperativeStatus ?? "none",
    providerProfile: input.providerProfile ?? null,
    passwordHash: hashPassword(input.password),
    createdAt: now.toISOString(),
    trialEndsAt: trialEndsAt.toISOString(),
  };

  users.push(user);
  return user;
}

export function updateUserPassword(userId: string, passwordHash: string): void {
  const user = users.find((u) => u.id === userId);
  if (user) user.passwordHash = passwordHash;
}

/** Links a freshly created cooperative back to the admin account that registered it. */
export function setUserCooperative(
  userId: string,
  cooperativeId: string,
  status: CooperativeStatus,
): void {
  const user = users.find((u) => u.id === userId);
  if (!user) return;
  user.cooperativeId = cooperativeId;
  user.cooperativeStatus = status;
}

/* ------------------------------------------------------------------ */
/* Cooperatives                                                        */
/* ------------------------------------------------------------------ */

/** Builds a human-readable join code like "MBL-4821" from the district name. */
function generateCooperativeCode(district: string): string {
  const prefix = (district.replace(/[^a-zA-Z]/g, "").toUpperCase() + "XXX").slice(0, 3);

  for (;;) {
    const code = `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
    if (!findCooperativeByCode(code)) return code;
  }
}

export function findCooperativeByCode(code: string): Cooperative | undefined {
  const normalized = code.trim().toUpperCase();
  return cooperatives.find((cooperative) => cooperative.code === normalized);
}

export function findCooperativeById(id: string): Cooperative | undefined {
  return cooperatives.find((cooperative) => cooperative.id === id);
}

/** Name/district lookup behind the "Can't find your code?" search. */
export function searchCooperatives(query: string, limit = 5): Cooperative[] {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];

  return cooperatives
    .filter(
      (cooperative) =>
        cooperative.name.toLowerCase().includes(needle) ||
        cooperative.district.toLowerCase().includes(needle),
    )
    .slice(0, limit);
}

export function createCooperative(input: {
  name: string;
  type: string;
  district: string;
  subCounty: string | null;
  registrationNumber: string | null;
  adminUserId: string | null;
}): Cooperative {
  const cooperative: Cooperative = {
    id: randomUUID(),
    name: input.name,
    code: generateCooperativeCode(input.district),
    type: input.type,
    district: input.district,
    subCounty: input.subCounty,
    registrationNumber: input.registrationNumber,
    adminUserId: input.adminUserId,
    createdAt: new Date().toISOString(),
  };

  cooperatives.push(cooperative);
  return cooperative;
}

/** Queues member invites for SMS delivery, skipping numbers already invited. */
export function inviteMembers(cooperativeId: string, phones: string[]): number {
  const invitedAt = new Date().toISOString();
  let added = 0;

  for (const phone of phones) {
    const exists = invites.some(
      (invite) => invite.cooperativeId === cooperativeId && invite.phone === phone,
    );
    if (exists) continue;

    invites.push({ cooperativeId, phone, invitedAt });
    added += 1;
  }

  // No SMS provider is wired up yet — log so invites are visible locally.
  console.log(`[dev] queued ${added} invite(s) for cooperative ${cooperativeId}`);

  return added;
}

/* ------------------------------------------------------------------ */
/* One-time passcodes                                                  */
/* ------------------------------------------------------------------ */

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

// Dev-only seed data so the app is immediately usable without going through
// registration. Never seeded in production — a hardcoded password has no place there.
if (process.env.NODE_ENV !== "production") {
  createUser({
    accountType: "farmer",
    fullName: "Byasi Solomon",
    phone: "+256786082882",
    email: "solomonbyasi@gmail.com",
    password: "Comp1234",
    district: "Budaka",
    subCounty: "Kamonkoli",
  });

  // Two cooperatives so the join-code field and its search fallback both work.
  createCooperative({
    name: "Budaka Farmers SACCO",
    type: "sacco",
    district: "Budaka",
    subCounty: "Kamonkoli",
    registrationNumber: "UG-SAC-00412",
    adminUserId: null,
  });

  createCooperative({
    name: "Mbale Highland Growers",
    type: "farmer-group",
    district: "Mbale",
    subCounty: null,
    registrationNumber: null,
    adminUserId: null,
  });

  for (const cooperative of cooperatives) {
    console.log(`[dev] cooperative "${cooperative.name}" join code: ${cooperative.code}`);
  }
}
