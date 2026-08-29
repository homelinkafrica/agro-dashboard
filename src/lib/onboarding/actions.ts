"use server";

import { redirect } from "next/navigation";
import type { ActionState } from "@/lib/auth/actions";
import { getCurrentUser } from "@/lib/auth/dal";
import {
  createCooperative,
  createUser,
  findCooperativeByCode,
  findUserByPhone,
  inviteMembers,
  searchCooperatives,
  setUserCooperative,
} from "@/lib/auth/db";
import { normalizeUgandaPhone } from "@/lib/auth/phone";
import { createSession } from "@/lib/auth/session";
import { createFarm } from "@/lib/farms/db";
import type {
  CooperativeFormValues,
  CooperativeMatch,
  FarmFormValues,
  FarmerFormValues,
  ProviderFormValues,
} from "./types";
import {
  AccountTypeSchema,
  CooperativeSignupSchema,
  FarmerSignupSchema,
  InviteMembersSchema,
  ProviderSignupSchema,
} from "./validation";

const SIGNUP_PATH_BY_TYPE = {
  farmer: "/register/farmer",
  cooperative: "/register/cooperative",
  provider: "/register/provider",
} as const;

function text(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

function textList(formData: FormData, name: string): string[] {
  return formData.getAll(name).map((value) => String(value));
}

const PHONE_TAKEN = "An account with this phone number already exists.";

/* ------------------------------------------------------------------ */
/* Screen 1 — account type selection                                   */
/* ------------------------------------------------------------------ */

export async function selectAccountTypeAction(
  _prevState: ActionState<{ accountType: string }>,
  formData: FormData,
): Promise<ActionState<{ accountType: string }>> {
  const accountType = text(formData, "accountType");
  const validated = AccountTypeSchema.safeParse(accountType);

  if (!validated.success) {
    return {
      message: "Select an account type to continue.",
      values: { accountType },
    };
  }

  redirect(SIGNUP_PATH_BY_TYPE[validated.data]);
}

/* ------------------------------------------------------------------ */
/* Cooperative lookup — shared by the farmer and provider screens       */
/* ------------------------------------------------------------------ */

export async function searchCooperativesAction(query: string): Promise<CooperativeMatch[]> {
  return searchCooperatives(query).map(({ id, name, code, district }) => ({
    id,
    name,
    code,
    district,
  }));
}

/* ------------------------------------------------------------------ */
/* Screen 2a — farmer signup                                            */
/* ------------------------------------------------------------------ */

export async function registerFarmerAction(
  _prevState: ActionState<FarmerFormValues>,
  formData: FormData,
): Promise<ActionState<FarmerFormValues>> {
  const values: FarmerFormValues = {
    belongsToCooperative: text(formData, "belongsToCooperative"),
    cooperativeCode: text(formData, "cooperativeCode"),
    fullName: text(formData, "fullName"),
    phone: text(formData, "phone"),
    email: text(formData, "email"),
    preferredLanguage: text(formData, "preferredLanguage"),
    district: text(formData, "district"),
    subCounty: text(formData, "subCounty"),
  };

  const validated = FarmerSignupSchema.safeParse({
    ...values,
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors, values };
  }

  const data = validated.data;

  if (findUserByPhone(data.phone)) {
    return { errors: { phone: [PHONE_TAKEN] }, values };
  }

  const cooperative = data.cooperativeCode ? findCooperativeByCode(data.cooperativeCode) : null;

  if (data.cooperativeCode && !cooperative) {
    return {
      errors: { cooperativeCode: ["We couldn't find a cooperative with that code."] },
      values,
    };
  }

  // Identity verification (SMS OTP, etc.) is the backend's responsibility —
  // this just creates the account and signs the farmer in directly.
  const user = createUser({
    accountType: "farmer",
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    password: data.password,
    district: data.district,
    subCounty: data.subCounty,
    preferredLanguage: data.preferredLanguage,
    cooperativeId: cooperative?.id ?? null,
    cooperativeStatus: cooperative ? "member" : "none",
  });

  await createSession(user.id);
  redirect("/onboarding/farm");
}

/* ------------------------------------------------------------------ */
/* Screen 2b — cooperative registration                                 */
/* ------------------------------------------------------------------ */

export async function registerCooperativeAction(
  _prevState: ActionState<CooperativeFormValues>,
  formData: FormData,
): Promise<ActionState<CooperativeFormValues>> {
  const values: CooperativeFormValues = {
    cooperativeName: text(formData, "cooperativeName"),
    district: text(formData, "district"),
    subCounty: text(formData, "subCounty"),
    cooperativeType: text(formData, "cooperativeType"),
    registrationNumber: text(formData, "registrationNumber"),
    fullName: text(formData, "fullName"),
    phone: text(formData, "phone"),
    email: text(formData, "email"),
  };

  const validated = CooperativeSignupSchema.safeParse({
    ...values,
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors, values };
  }

  const data = validated.data;

  if (findUserByPhone(data.phone)) {
    return { errors: { phone: [PHONE_TAKEN] }, values };
  }

  const admin = createUser({
    accountType: "cooperative",
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    password: data.password,
    district: data.district,
    subCounty: data.subCounty,
  });

  const cooperative = createCooperative({
    name: data.cooperativeName,
    type: data.cooperativeType,
    district: data.district,
    subCounty: data.subCounty,
    registrationNumber: data.registrationNumber,
    adminUserId: admin.id,
  });

  setUserCooperative(admin.id, cooperative.id, "admin");

  await createSession(admin.id);
  redirect("/onboarding/members");
}

/* ------------------------------------------------------------------ */
/* Screen 2c — service provider signup                                  */
/* ------------------------------------------------------------------ */

export async function registerProviderAction(
  _prevState: ActionState<ProviderFormValues>,
  formData: FormData,
): Promise<ActionState<ProviderFormValues>> {
  const values: ProviderFormValues = {
    providerRole: text(formData, "providerRole"),
    workMode: text(formData, "workMode"),
    cooperativeCode: text(formData, "cooperativeCode"),
    serviceAreas: textList(formData, "serviceAreas"),
    services: textList(formData, "services"),
    licenseNumber: text(formData, "licenseNumber"),
    fullName: text(formData, "fullName"),
    phone: text(formData, "phone"),
    email: text(formData, "email"),
    preferredLanguage: text(formData, "preferredLanguage"),
  };

  const validated = ProviderSignupSchema.safeParse({
    ...values,
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors, values };
  }

  const data = validated.data;

  if (findUserByPhone(data.phone)) {
    return { errors: { phone: [PHONE_TAKEN] }, values };
  }

  const isAffiliated = data.workMode === "affiliated";
  const cooperative = isAffiliated ? findCooperativeByCode(data.cooperativeCode ?? "") : null;

  if (isAffiliated && !cooperative) {
    return {
      errors: { cooperativeCode: ["We couldn't find a cooperative with that code."] },
      values,
    };
  }

  const user = createUser({
    accountType: "provider",
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    password: data.password,
    // Affiliated providers inherit their district from the cooperative they joined.
    district: cooperative?.district ?? data.serviceAreas[0] ?? "",
    preferredLanguage: data.preferredLanguage,
    cooperativeId: cooperative?.id ?? null,
    // Affiliation stays pending until the cooperative approves it.
    cooperativeStatus: isAffiliated ? "pending" : "none",
    providerProfile: {
      role: data.providerRole,
      workMode: data.workMode,
      serviceAreas: isAffiliated ? [] : data.serviceAreas,
      services: isAffiliated ? [] : data.services,
      licenseNumber: isAffiliated ? null : (data.licenseNumber ?? null),
    },
  });

  await createSession(user.id);
  redirect("/");
}

/* ------------------------------------------------------------------ */
/* Screen 3 — post-signup setup                                         */
/* ------------------------------------------------------------------ */

export async function createFarmAction(
  _prevState: ActionState<FarmFormValues>,
  formData: FormData,
): Promise<ActionState<FarmFormValues>> {
  const user = await getCurrentUser();
  const values: FarmFormValues = {
    name: text(formData, "name"),
    district: text(formData, "district"),
    areaHectares: text(formData, "areaHectares"),
    fieldCount: text(formData, "fieldCount"),
  };

  const errors: Record<string, string[]> = {};
  if (values.name.length < 2) errors.name = ["Enter a name for your farm."];
  if (!values.district) errors.district = ["Select the district your farm is in."];

  const areaHectares = Number(values.areaHectares);
  if (!values.areaHectares || Number.isNaN(areaHectares) || areaHectares <= 0) {
    errors.areaHectares = ["Enter the farm size in hectares."];
  }

  const fieldCount = values.fieldCount ? Number(values.fieldCount) : 0;
  if (Number.isNaN(fieldCount) || fieldCount < 0) {
    errors.fieldCount = ["Enter a whole number of fields."];
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values };
  }

  createFarm({
    name: values.name,
    areaHectares,
    fieldCount: Math.round(fieldCount),
    farmerName: user.fullName,
    email: user.email ?? "",
    address: values.district,
  });

  redirect("/");
}

export async function inviteMembersAction(
  _prevState: ActionState<{ phones: string }>,
  formData: FormData,
): Promise<ActionState<{ phones: string }>> {
  const user = await getCurrentUser();
  const values = { phones: text(formData, "phones") };

  const validated = InviteMembersSchema.safeParse(values);
  if (!validated.success || !user.cooperativeId) {
    return { message: "We couldn't send those invites. Please try again.", values };
  }

  const raw = (validated.data.phones ?? "")
    .split(/[\s,;]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  const invalid: string[] = [];
  const normalized: string[] = [];

  for (const entry of raw) {
    const phone = normalizeUgandaPhone(entry);
    if (phone) normalized.push(phone);
    else invalid.push(entry);
  }

  if (invalid.length > 0) {
    return {
      errors: { phones: [`These don't look like Ugandan numbers: ${invalid.join(", ")}`] },
      values,
    };
  }

  if (normalized.length > 0) {
    inviteMembers(user.cooperativeId, normalized);
  }

  redirect("/");
}
