import Link from "next/link";
import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { SessionUser } from "@/lib/auth/types";

export function NextStepCard({ user }: { user: SessionUser }) {
  return (
    <Card
      title="Next step"
      icon={
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <Info className="h-4 w-4" />
        </span>
      }
    >
      {user.accountType === "cooperative" ? (
        <CooperativeNextStep />
      ) : user.accountType === "provider" ? (
        <ProviderNextStep isPending={user.cooperativeStatus === "pending"} />
      ) : (
        <FarmerNextStep />
      )}
    </Card>
  );
}

function FarmerNextStep() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-zinc-700">You don&apos;t have any fields.</p>
        <p className="text-sm text-zinc-700">There are several options how to add fields:</p>
      </div>

      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          Draw field on map
        </button>
        <button
          type="button"
          className="rounded-lg border border-green-600 px-4 py-2.5 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
        >
          Import from SHP file
        </button>
        <button
          type="button"
          className="rounded-lg border border-green-600 px-4 py-2.5 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
        >
          Import from XML, GML or KML file
        </button>
      </div>
    </div>
  );
}

function CooperativeNextStep() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-zinc-700">
        Bring your members on board so they can start using the app under your cooperative.
      </p>
      <Link
        href="/onboarding/members"
        className="rounded-lg bg-green-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-green-700"
      >
        Invite members
      </Link>
    </div>
  );
}

function ProviderNextStep({ isPending }: { isPending: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-zinc-700">
        {isPending
          ? "Once your cooperative confirms your affiliation, farmers there will be able to reach you directly."
          : "Your profile is live — farmers and cooperatives in your service area can now find and book you."}
      </p>
      <Link
        href="/profile"
        className="rounded-lg border border-green-600 px-4 py-2.5 text-center text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
      >
        View your profile
      </Link>
    </div>
  );
}
