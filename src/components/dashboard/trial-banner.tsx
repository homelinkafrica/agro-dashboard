export function TrialBanner({ daysLeft = 29 }: { daysLeft?: number }) {
  return (
    <div className="border-t border-zinc-700 bg-zinc-800 px-4 py-2 text-center text-xs font-semibold tracking-wide text-zinc-200 uppercase sm:px-6">
      Trial ends in {daysLeft} days
    </div>
  );
}
