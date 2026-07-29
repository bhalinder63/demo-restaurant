import Link from "next/link";
import Header from "@/components/Header";
import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-md px-6 pb-24 pt-4">
        <h1 className="mb-8 text-3xl font-bold text-brand-navy">Log In</h1>
        <LoginForm callbackUrl={callbackUrl ?? "/"} />
        <p className="mt-4 text-center text-sm text-brand-navy/60">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-brand-orange">
            Sign up
          </Link>
        </p>
      </main>
    </div>
  );
}
