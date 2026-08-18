const UGANDA_COUNTRY_CODE = "+256";

/**
 * Normalizes a Ugandan phone number to E.164 (+256XXXXXXXXX).
 * Accepts local formats like "0712345678", "712345678", or "+256712345678".
 * Returns null if the number doesn't look like a valid Ugandan mobile number.
 */
export function normalizeUgandaPhone(raw: string): string | null {
  const digits = raw.replace(/[^\d]/g, "");

  let national: string | null = null;
  if (digits.startsWith("256") && digits.length === 12) {
    national = digits.slice(3);
  } else if (digits.startsWith("0") && digits.length === 10) {
    national = digits.slice(1);
  } else if (digits.length === 9) {
    national = digits;
  }

  if (!national || !/^[1-9]\d{8}$/.test(national)) {
    return null;
  }

  return `${UGANDA_COUNTRY_CODE}${national}`;
}

/** Formats an E.164 Ugandan number for display, e.g. +256 712 345 678 */
export function formatUgandaPhone(e164: string): string {
  const match = e164.match(/^\+256(\d{3})(\d{3})(\d{3})$/);
  if (!match) return e164;
  return `+256 ${match[1]} ${match[2]} ${match[3]}`;
}
