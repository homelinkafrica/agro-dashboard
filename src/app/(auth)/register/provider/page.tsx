import Link from "next/link";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { ProviderForm } from "./provider-form";

export default function ProviderSignupPage() {
  return (
    <OnboardingShell
      step={2}
      title="Set up your provider account"
      subtitle="Tell us what you do and where you work so farmers can find you."
      footer={
        <p>
          <Link href="/register" className="font-medium text-green-600 hover:text-green-700">
            Back to account type
          </Link>
        </p>
      }
    >
      <ProviderForm />
    </OnboardingShell>
  );
}
