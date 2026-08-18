function formatDate(iso: string): string {
  const date = new Date(iso);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${date.getFullYear()}`;
}

export function PlansCard({ createdAt, trialEndsAt }: { createdAt: string; trialEndsAt: string }) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">Plans</h2>
      <dl className="mt-4 space-y-1.5 text-sm">
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 font-medium tracking-wide text-zinc-500 uppercase">Plan name:</dt>
          <dd className="text-zinc-700">Trial</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 font-medium tracking-wide text-zinc-500 uppercase">Active:</dt>
          <dd className="text-zinc-700">
            {formatDate(createdAt)} — {formatDate(trialEndsAt)}
          </dd>
        </div>
      </dl>
    </section>
  );
}
