import type { ReactNode } from "react";
import { Sprout } from "lucide-react";

const WIDTHS = {
  default: "max-w-[560px]",
  wide: "max-w-[640px]",
} as const;

/**
 * Centered single-column frame shared by every onboarding screen. Unlike
 * AuthCard this sits directly on the page rather than in a boxed card, and
 * carries the persistent "Step X of 3" indicator.
 */
export function OnboardingShell({
  step,
  totalSteps = 3,
  title,
  subtitle,
  width = "default",
  children,
  footer,
}: {
  step: number;
  totalSteps?: number;
  title: string;
  subtitle?: string;
  width?: keyof typeof WIDTHS;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className={`w-full ${WIDTHS[width]}`}>
      <div className="mb-8 flex items-center justify-center gap-2">
        <Sprout className="h-8 w-8 text-green-600" />
        <span className="text-xl font-semibold tracking-tight text-zinc-900">
          Agro<span className="text-amber-500">Uganda</span>
        </span>
      </div>

      <p className="text-xs font-semibold tracking-wide text-green-700 uppercase">
        Step {step} of {totalSteps}
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">{title}</h1>
      {subtitle && <p className="mt-1.5 text-sm text-zinc-500">{subtitle}</p>}

      <div className="mt-8">{children}</div>

      {footer && <div className="mt-8 text-center text-sm text-zinc-600">{footer}</div>}
    </div>
  );
}
