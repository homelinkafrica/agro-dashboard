export function getTrialDaysLeft(trialEndsAt: string): number {
  const msLeft = new Date(trialEndsAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(msLeft / (24 * 60 * 60 * 1000)));
}
