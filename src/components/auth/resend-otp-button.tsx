"use client";

import { useActionState, useEffect, useState } from "react";
import { resendOtpAction } from "@/lib/auth/actions";
import type { OtpPurpose } from "@/lib/auth/types";

const COOLDOWN_SECONDS = 30;

export function ResendOtpButton({ phone, purpose }: { phone: string; purpose: OtpPurpose }) {
  const resendBound = resendOtpAction.bind(null, phone, purpose);
  const [state, formAction, pending] = useActionState(resendBound, undefined);
  const [secondsLeft, setSecondsLeft] = useState(COOLDOWN_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const canResend = secondsLeft === 0 && !pending;

  return (
    <form
      action={formAction}
      onSubmit={() => setSecondsLeft(COOLDOWN_SECONDS)}
      className="flex flex-col items-center gap-1 text-sm"
    >
      <button
        type="submit"
        disabled={!canResend}
        className="font-medium text-green-600 hover:text-green-700 disabled:cursor-not-allowed disabled:text-zinc-400"
      >
        {secondsLeft > 0 ? `Resend code in ${secondsLeft}s` : pending ? "Sending…" : "Resend code"}
      </button>
      {state?.message && <p className="text-zinc-500">{state.message}</p>}
    </form>
  );
}
