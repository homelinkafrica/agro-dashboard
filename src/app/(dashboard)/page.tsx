import { ImportExportCard } from "@/components/dashboard/import-export-card";
import { MapCard } from "@/components/dashboard/map-card";
import { NextStepCard } from "@/components/dashboard/next-step-card";
import { PendingAffiliationBanner } from "@/components/dashboard/pending-affiliation-banner";
import { TasksCard } from "@/components/dashboard/tasks-card";
import { TrialBanner } from "@/components/dashboard/trial-banner";
import { WeatherCard } from "@/components/dashboard/weather-card";
import { findCooperativeById } from "@/lib/auth/db";
import { getCurrentUser } from "@/lib/auth/dal";
import { getTrialDaysLeft } from "@/lib/trial";

export default async function Home() {
  const user = await getCurrentUser();
  const daysLeft = getTrialDaysLeft(user.trialEndsAt);
  const cooperative =
    user.cooperativeStatus === "pending" && user.cooperativeId
      ? findCooperativeById(user.cooperativeId)
      : undefined;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3 px-4 pt-6 sm:px-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
        {cooperative && <PendingAffiliationBanner cooperativeName={cooperative.name} />}
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start">
        <div className="lg:row-span-3">
          <MapCard />
        </div>
        <TasksCard />
        <div className="lg:col-start-3">
          <ImportExportCard />
        </div>
        <WeatherCard />
        <NextStepCard user={user} />
      </div>

      <div className="mt-auto">
        <TrialBanner daysLeft={daysLeft} />
      </div>
    </div>
  );
}
