import Link from "next/link";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { getCurrentUser } from "@/lib/auth/dal";
import { FarmSetupForm } from "./farm-setup-form";

export default async function FarmSetupPage() {
  const user = await getCurrentUser();

  return (
    <OnboardingShell
      step={3}
      title="Set up your farm"
      subtitle="Add your farm so we can start keeping its records. You can add more farms later."
      footer={
        <p>
          <Link href="/" className="font-medium text-green-600 hover:text-green-700">
            Skip for now
          </Link>
        </p>
      }
    >
      <FarmSetupForm defaultDistrict={user.district} />
    </OnboardingShell>
  );
}
