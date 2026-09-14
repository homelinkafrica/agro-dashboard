export type Farm = {
  id: string;
  name: string;
  /** null when the farmer skipped it at setup — "not set" rather than zero. */
  areaHectares: number | null;
  fieldCount: number;
  farmerName: string;
  email: string;
  address: string;
  /** Values from ENTERPRISE_TYPES — what the farm raises/grows. */
  enterpriseTypes?: string[];
  latitude?: number | null;
  longitude?: number | null;
};
