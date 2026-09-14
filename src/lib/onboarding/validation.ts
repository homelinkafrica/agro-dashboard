import { z } from "zod";
import { passwordField, phoneField } from "@/lib/auth/validation";
import {
  ACCOUNT_TYPES,
  COOPERATIVE_TYPES,
  DISTRICTS,
  LANGUAGES,
  PROVIDER_ROLES,
  SERVICES_OFFERED,
} from "./options";

const values = <T extends { value: string }>(options: readonly T[]) =>
  options.map((option) => option.value) as [string, ...string[]];

const fullNameField = z.string().trim().min(2, { error: "Enter your full name." });

const optionalEmailField = z
  .union([z.email({ error: "Enter a valid email." }), z.literal("")])
  .optional()
  .transform((value) => (value ? value : null));

const requiredEmailField = z
  .string()
  .trim()
  .min(1, { error: "Email is required." })
  .pipe(z.email({ error: "Enter a valid email." }));

const districtField = z.enum(DISTRICTS, { error: "Select your district." });

const subCountyField = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : null));

const languageField = z.enum(values(LANGUAGES), { error: "Select your preferred language." });

const optionalTextField = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : null));

/** 4–6 digit PIN — the preferred credential for feature-phone-adjacent farmers. */
const pinField = z.string().regex(/^\d{4,6}$/, { error: "Enter a 4–6 digit PIN." });

export const AccountTypeSchema = z.enum(ACCOUNT_TYPES, {
  error: "Select an account type to continue.",
});

export const FarmerSignupSchema = z
  .object({
    belongsToCooperative: z.enum(["yes", "no"], {
      error: "Tell us whether you belong to a cooperative.",
    }),
    cooperativeCode: z.string().trim().optional(),
    fullName: fullNameField,
    phone: phoneField,
    email: optionalEmailField,
    credentialType: z.enum(["password", "pin"]).default("password"),
    // Whichever of these isn't rendered arrives as null (FormData.get on a
    // missing field), not undefined — .nullish() accepts both.
    password: z.string().nullish(),
    pin: z.string().nullish(),
    preferredLanguage: languageField,
    district: districtField,
    subCounty: subCountyField,
  })
  .superRefine((data, ctx) => {
    if (data.belongsToCooperative === "yes" && !data.cooperativeCode) {
      ctx.addIssue({
        code: "custom",
        path: ["cooperativeCode"],
        message: "Enter your cooperative code, or search for it by name or district.",
      });
    }

    if (data.credentialType === "pin") {
      if (!pinField.safeParse(data.pin ?? "").success) {
        ctx.addIssue({ code: "custom", path: ["pin"], message: "Enter a 4–6 digit PIN." });
      }
    } else {
      const result = passwordField.safeParse(data.password ?? "");
      if (!result.success) {
        ctx.addIssue({
          code: "custom",
          path: ["password"],
          message: result.error.issues[0]?.message ?? "Enter a valid password.",
        });
      }
    }
  })
  .transform((data) => ({
    ...data,
    cooperativeCode:
      data.belongsToCooperative === "yes" ? (data.cooperativeCode ?? "").toUpperCase() : null,
    // A PIN is just a short numeric password — same hashing pipeline either way.
    credential: data.credentialType === "pin" ? data.pin! : data.password!,
  }));

export const CooperativeSignupSchema = z.object({
  // Cooperative details
  cooperativeName: z.string().trim().min(2, { error: "Enter the cooperative's name." }),
  district: districtField,
  subCounty: subCountyField,
  cooperativeType: z.enum(values(COOPERATIVE_TYPES), { error: "Select a cooperative type." }),
  registrationNumber: optionalTextField,
  // Admin account
  fullName: fullNameField,
  phone: phoneField,
  email: optionalEmailField,
  password: passwordField,
});

export const ProviderSignupSchema = z
  .object({
    providerRole: z.enum(values(PROVIDER_ROLES), { error: "Select your role." }),
    professionalTitle: z
      .string()
      .trim()
      .min(2, { error: "Enter a professional title, e.g. \"Veterinary officer\"." }),
    workMode: z.enum(["independent", "affiliated"], {
      error: "Tell us how you'll be working.",
    }),
    cooperativeCode: z.string().trim().optional(),
    serviceAreas: z.array(z.enum(DISTRICTS)).default([]),
    services: z.array(z.enum(values(SERVICES_OFFERED))).default([]),
    licenseNumber: z.string().trim().optional(),
    fullName: fullNameField,
    phone: phoneField,
    email: requiredEmailField,
    password: passwordField,
    preferredLanguage: languageField,
  })
  .superRefine((data, ctx) => {
    if (data.workMode === "affiliated") {
      if (!data.cooperativeCode) {
        ctx.addIssue({
          code: "custom",
          path: ["cooperativeCode"],
          message: "Enter the cooperative's code, or search for it by name or district.",
        });
      }
    } else {
      if (data.serviceAreas.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["serviceAreas"],
          message: "Select at least one district you cover.",
        });
      }

      if (data.services.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["services"],
          message: "Select at least one service you offer.",
        });
      }
    }

    // A license is required for vets on either work mode; optional for other roles.
    if (data.providerRole === "vet" && !data.licenseNumber) {
      ctx.addIssue({
        code: "custom",
        path: ["licenseNumber"],
        message: "Enter your veterinary license or registration number.",
      });
    }
  });

export const InviteMembersSchema = z.object({
  /** Free-text paste of phone numbers, split on commas / whitespace / newlines. */
  phones: z.string().trim().optional(),
});
