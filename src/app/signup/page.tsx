import Link from "next/link";
import Header from "@/components/Header";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-md px-6 pb-24 pt-4">
        <h1 className="mb-8 font-display text-3xl font-bold text-brand-navy">Create an Account</h1>
        <SignupForm />
        <p className="mt-4 text-center text-sm text-brand-navy/60">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-brand-orange">
            Log in
          </Link>
        </p>
      </main>
    </div>
  );
}
