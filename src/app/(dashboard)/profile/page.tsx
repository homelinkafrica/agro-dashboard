import { PendingAffiliationBanner } from "@/components/dashboard/pending-affiliation-banner";
import { PlansCard } from "@/components/profile/plans-card";
import { ProfileInfoCard } from "@/components/profile/profile-info-card";
import { VisualSettingsCard } from "@/components/profile/visual-settings-card";
import { findCooperativeById } from "@/lib/auth/db";
import { getCurrentUser } from "@/lib/auth/dal";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  const cooperative =
    user.cooperativeStatus === "pending" && user.cooperativeId
      ? findCooperativeById(user.cooperativeId)
      : undefined;

  return (
    <div className="flex flex-col gap-4 px-4 py-6 sm:px-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Profile</h1>

      <div className="flex max-w-2xl flex-col gap-4">
        {cooperative && <PendingAffiliationBanner cooperativeName={cooperative.name} />}
        <ProfileInfoCard user={user} />
        <PlansCard createdAt={user.createdAt} trialEndsAt={user.trialEndsAt} />
        <VisualSettingsCard />
      </div>
    </div>
  );
}
