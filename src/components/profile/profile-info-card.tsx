import { UserRound } from "lucide-react";
import type { SessionUser } from "@/lib/auth/types";
import { formatUgandaPhone } from "@/lib/auth/phone";
import { SignOutButton } from "./sign-out-button";

export function ProfileInfoCard({ user }: { user: SessionUser }) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-green-50">
            <UserRound className="h-10 w-10 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">{user.fullName}</h2>
            <dl className="mt-2 space-y-1.5 text-sm">
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 font-medium tracking-wide text-zinc-500 uppercase">Phone:</dt>
                <dd className="text-zinc-700">{formatUgandaPhone(user.phone)}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 font-medium tracking-wide text-zinc-500 uppercase">Email:</dt>
                <dd className="text-zinc-700">{user.email ?? "Not set"}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 font-medium tracking-wide text-zinc-500 uppercase">Address:</dt>
                <dd className="text-zinc-700">{user.address}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <SignOutButton />
        </div>
      </div>
    </section>
  );
}
