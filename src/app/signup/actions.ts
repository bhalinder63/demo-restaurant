"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function signup(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return "Please fill in all fields.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return "An account with this email already exists.";
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name, email, passwordHash, role: "CUSTOMER" },
  });

  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Account created — please log in.";
    }
    throw error;
  }
}
