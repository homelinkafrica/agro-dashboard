import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in with your phone number to continue."
      footer={
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-green-600 hover:text-green-700">
            Register
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
