import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { ResendOtpButton } from "@/components/auth/resend-otp-button";
import { formatUgandaPhone } from "@/lib/auth/phone";
import { ResetPasswordForm } from "./reset-password-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ phone?: string; dev_otp?: string }>;
}) {
  const { phone, dev_otp: devOtp } = await searchParams;

  if (!phone) {
    redirect("/forgot-password");
  }

  return (
    <AuthCard title="Reset your password" subtitle={`Enter the code we sent to ${formatUgandaPhone(phone)}.`}>
      <div className="flex flex-col gap-6">
        {devOtp && (
          <p className="w-full rounded-lg bg-amber-50 px-3 py-2 text-center text-sm text-amber-700">
            Dev mode: your code is <span className="font-semibold">{devOtp}</span>
          </p>
        )}
        <ResetPasswordForm phone={phone} />
        <ResendOtpButton phone={phone} purpose="reset-password" />
      </div>
    </AuthCard>
  );
}
