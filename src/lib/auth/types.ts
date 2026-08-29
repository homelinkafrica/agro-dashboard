import type { AccountType } from "@/lib/onboarding/options";

export type { AccountType };

export type ProviderWorkMode = "independent" | "affiliated";

/** How a user relates to the cooperative referenced by `cooperativeId`. */
export type CooperativeStatus = "none" | "member" | "admin" | "pending";

export type ProviderProfile = {
  role: string;
  workMode: ProviderWorkMode;
  /** Districts the provider covers — independent providers only. */
  serviceAreas: string[];
  /** Service slugs from SERVICES_OFFERED — independent providers only. */
  services: string[];
  licenseNumber: string | null;
};

export type User = {
  id: string;
  accountType: AccountType;
  fullName: string;
  /** Normalized E.164 phone number, e.g. +256712345678 */
  phone: string;
  email: string | null;
  district: string;
  subCounty: string | null;
  address: string;
  /** Language code from LANGUAGES. Cooperative admins default to English. */
  preferredLanguage: string;
  cooperativeId: string | null;
  cooperativeStatus: CooperativeStatus;
  providerProfile: ProviderProfile | null;
  passwordHash: string;
  createdAt: string;
  trialEndsAt: string;
};

/** Safe subset of a User that is fine to send to the client. */
export type SessionUser = Omit<User, "passwordHash">;

export type Cooperative = {
  id: string;
  name: string;
  /** Short code members type in during signup, e.g. "MBL-4821". */
  code: string;
  type: string;
  district: string;
  subCounty: string | null;
  registrationNumber: string | null;
  adminUserId: string | null;
  createdAt: string;
};

/** A phone number invited to join a cooperative, pending SMS delivery. */
export type CooperativeInvite = {
  cooperativeId: string;
  phone: string;
  invitedAt: string;
};

export type OtpPurpose = "reset-password";

export type SessionPayload = {
  userId: string;
  expiresAt: string;
};
