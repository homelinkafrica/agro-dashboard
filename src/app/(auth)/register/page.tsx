import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Set up your account to start managing your farm."
      footer={
        <p>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-green-600 hover:text-green-700">
            Sign in
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
