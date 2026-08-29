import Link from "next/link";
import { redirect } from "next/navigation";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { getCurrentUser } from "@/lib/auth/dal";
import { findCooperativeById } from "@/lib/auth/db";
import { InviteMembersForm } from "./invite-members-form";

export default async function InviteMembersPage() {
  const user = await getCurrentUser();
  const cooperative = user.cooperativeId ? findCooperativeById(user.cooperativeId) : undefined;

  // Only a cooperative admin has members to invite.
  if (!cooperative || user.cooperativeStatus !== "admin") {
    redirect("/");
  }

  return (
    <OnboardingShell
      step={3}
      width="wide"
      title="Invite your members"
      subtitle={`Bring the members of ${cooperative.name} on board — you can always do this later.`}
      footer={
        <p>
          <Link href="/" className="font-medium text-green-600 hover:text-green-700">
            Skip for now
          </Link>
        </p>
      }
    >
      <InviteMembersForm joinCode={cooperative.code} />
    </OnboardingShell>
  );
}
