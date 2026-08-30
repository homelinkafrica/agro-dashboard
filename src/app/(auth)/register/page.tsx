import Link from "next/link";
import { AccountTypeForm } from "@/components/onboarding/account-type-form";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";

export default function RegisterPage() {
  return (
    <OnboardingShell
      step={1}
      title="Create your account"
      subtitle="Choose how you'll be using the platform"
      footer={
        <p>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-green-600 hover:text-green-700">
            Log in
          </Link>
        </p>
      }
    >
      <AccountTypeForm />
    </OnboardingShell>
  );
}
