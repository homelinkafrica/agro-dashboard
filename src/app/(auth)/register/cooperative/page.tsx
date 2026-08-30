import Link from "next/link";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { CooperativeForm } from "./cooperative-form";

export default function CooperativeSignupPage() {
  return (
    <OnboardingShell
      step={2}
      width="wide"
      title="Register your cooperative"
      subtitle="Add the cooperative's details and create the admin account that will manage it."
      footer={
        <p>
          <Link href="/register" className="font-medium text-green-600 hover:text-green-700">
            Back to account type
          </Link>
        </p>
      }
    >
      <CooperativeForm />
    </OnboardingShell>
  );
}
