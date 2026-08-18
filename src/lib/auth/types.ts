export type User = {
  id: string;
  fullName: string;
  /** Normalized E.164 phone number, e.g. +256712345678 */
  phone: string;
  email: string | null;
  address: string;
  phoneVerified: boolean;
  passwordHash: string;
  createdAt: string;
  trialEndsAt: string;
};

/** Safe subset of a User that is fine to send to the client. */
export type SessionUser = Omit<User, "passwordHash">;

export type OtpPurpose = "verify-phone" | "reset-password";

export type SessionPayload = {
  userId: string;
  expiresAt: string;
};
