import { Clock } from "lucide-react";

export function PendingAffiliationBanner({ cooperativeName }: { cooperativeName: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
      <p>
        Your affiliation with <span className="font-semibold">{cooperativeName}</span> is pending
        approval. You can keep using the app in the meantime — we&apos;ll let you know once
        they&apos;ve confirmed it.
      </p>
    </div>
  );
}
