import Link from "next/link";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { FarmerForm } from "./farmer-form";

export default function FarmerSignupPage() {
  return (
    <OnboardingShell
      step={2}
      title="Set up your farmer account"
      subtitle="Tell us a little about you so we can set up your farm records."
      footer={
        <p>
          <Link href="/register" className="font-medium text-green-600 hover:text-green-700">
            Back to account type
          </Link>
        </p>
      }
    >
      <FarmerForm />
    </OnboardingShell>
  );
}
