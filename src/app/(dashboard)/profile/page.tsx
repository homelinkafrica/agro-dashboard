import { PlansCard } from "@/components/profile/plans-card";
import { ProfileInfoCard } from "@/components/profile/profile-info-card";
import { VisualSettingsCard } from "@/components/profile/visual-settings-card";
import { getCurrentUser } from "@/lib/auth/dal";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-4 px-4 py-6 sm:px-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Profile</h1>

      <div className="flex max-w-2xl flex-col gap-4">
        <ProfileInfoCard user={user} />
        <PlansCard createdAt={user.createdAt} trialEndsAt={user.trialEndsAt} />
        <VisualSettingsCard />
      </div>
    </div>
  );
}
