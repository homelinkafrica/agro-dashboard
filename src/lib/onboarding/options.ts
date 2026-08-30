/**
 * Reference lists used by the onboarding forms.
 * TODO: these should come from the API once the backend exposes them.
 */

export type Option<T extends string = string> = {
  value: T;
  label: string;
};

export const ACCOUNT_TYPES = ["farmer", "cooperative", "provider"] as const;
export type AccountType = (typeof ACCOUNT_TYPES)[number];

export const COOPERATIVE_TYPES: Option[] = [
  { value: "sacco", label: "SACCO" },
  { value: "vsla", label: "VSLA" },
  { value: "farmer-group", label: "Farmer group / association" },
  { value: "other", label: "Other" },
];

export const PROVIDER_ROLES: Option[] = [
  { value: "vet", label: "Vet" },
  { value: "field-agent", label: "Field agent" },
  { value: "extension-officer", label: "Extension officer" },
];

export const LANGUAGES: Option[] = [
  { value: "en", label: "English" },
  { value: "lg", label: "Luganda" },
  { value: "nyn", label: "Runyankole" },
  { value: "ttj", label: "Rutooro" },
  { value: "xog", label: "Lusoga" },
  { value: "teo", label: "Ateso" },
  { value: "ach", label: "Acholi" },
  { value: "laj", label: "Lango" },
  { value: "lgg", label: "Lugbara" },
  { value: "sw", label: "Kiswahili" },
];

export const SERVICES_OFFERED: Option[] = [
  { value: "veterinary-care", label: "Veterinary care" },
  { value: "artificial-insemination", label: "Artificial insemination" },
  { value: "animal-nutrition", label: "Animal nutrition & feeds" },
  { value: "crop-agronomy", label: "Crop agronomy advice" },
  { value: "soil-testing", label: "Soil testing" },
  { value: "pest-disease-control", label: "Pest & disease control" },
  { value: "record-keeping", label: "Farm record keeping" },
  { value: "training-extension", label: "Training & extension" },
  { value: "market-linkage", label: "Market linkage" },
];

/** Subset of Ugandan districts — enough to cover the pilot regions. */
export const DISTRICTS = [
  "Amuria",
  "Apac",
  "Arua",
  "Budaka",
  "Bugiri",
  "Bukedea",
  "Bulambuli",
  "Bushenyi",
  "Busia",
  "Butaleja",
  "Buyende",
  "Gulu",
  "Hoima",
  "Iganga",
  "Jinja",
  "Kabale",
  "Kalangala",
  "Kampala",
  "Kamuli",
  "Kapchorwa",
  "Kasese",
  "Kayunga",
  "Kibaale",
  "Kiboga",
  "Kitgum",
  "Kumi",
  "Lira",
  "Luwero",
  "Masaka",
  "Masindi",
  "Mbale",
  "Mbarara",
  "Mityana",
  "Moroto",
  "Mpigi",
  "Mubende",
  "Mukono",
  "Nebbi",
  "Ntungamo",
  "Pallisa",
  "Rakai",
  "Sironko",
  "Soroti",
  "Tororo",
  "Wakiso",
] as const;

export const DISTRICT_OPTIONS: Option[] = DISTRICTS.map((district) => ({
  value: district,
  label: district,
}));

export function labelFor(options: Option[], value: string | null | undefined): string {
  return options.find((option) => option.value === value)?.label ?? "";
}
