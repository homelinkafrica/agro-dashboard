import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { ResendOtpButton } from "@/components/auth/resend-otp-button";
import { formatUgandaPhone } from "@/lib/auth/phone";
import { VerifyPhoneForm } from "./verify-phone-form";

export default async function VerifyPhonePage({
  searchParams,
}: {
  searchParams: Promise<{ phone?: string; dev_otp?: string }>;
}) {
  const { phone, dev_otp: devOtp } = await searchParams;

  if (!phone) {
    redirect("/register");
  }

  return (
    <AuthCard title="Verify your phone" subtitle={`Enter the 6-digit code we sent to ${formatUgandaPhone(phone)}.`}>
      <div className="flex flex-col items-center gap-6">
        {devOtp && (
          <p className="w-full rounded-lg bg-amber-50 px-3 py-2 text-center text-sm text-amber-700">
            Dev mode: your code is <span className="font-semibold">{devOtp}</span>
          </p>
        )}
        <VerifyPhoneForm phone={phone} />
        <ResendOtpButton phone={phone} purpose="verify-phone" />
      </div>
    </AuthCard>
  );
}
