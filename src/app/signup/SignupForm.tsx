"use client";

import { useActionState } from "react";
import { signup } from "./actions";

export default function SignupForm() {
  const [errorMessage, formAction, isPending] = useActionState(signup, undefined);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-brand-navy">
          Full name
        </label>
        <input
          id="name"
          name="name"
          required
          className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange"
          placeholder="Jane Doe"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-brand-navy">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange"
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium text-brand-navy">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange"
          placeholder="At least 6 characters"
        />
      </div>

      {errorMessage && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-orange-dark disabled:opacity-60"
      >
        {isPending ? "Creating account…" : "Sign Up"}
      </button>
    </form>
  );
}
