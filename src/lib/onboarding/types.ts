/**
 * Shapes echoed back to the onboarding forms after a failed submit so they can
 * refill themselves. Passwords are deliberately never included.
 */

export type FarmerFormValues = {
  belongsToCooperative: string;
  cooperativeCode: string;
  fullName: string;
  phone: string;
  email: string;
  preferredLanguage: string;
  district: string;
  subCounty: string;
};

export type CooperativeFormValues = {
  cooperativeName: string;
  district: string;
  subCounty: string;
  cooperativeType: string;
  registrationNumber: string;
  fullName: string;
  phone: string;
  email: string;
};

export type ProviderFormValues = {
  providerRole: string;
  workMode: string;
  cooperativeCode: string;
  serviceAreas: string[];
  services: string[];
  licenseNumber: string;
  fullName: string;
  phone: string;
  email: string;
  preferredLanguage: string;
};

export type FarmFormValues = {
  name: string;
  district: string;
  areaHectares: string;
  fieldCount: string;
};

/** Trimmed-down cooperative shape returned by the "search by name or district" lookup. */
export type CooperativeMatch = {
  id: string;
  name: string;
  code: string;
  district: string;
};
