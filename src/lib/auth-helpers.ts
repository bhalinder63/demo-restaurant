import { auth } from "@/auth";

export async function requireOwner() {
  const session = await auth();
  if (!session?.user || session.user.role !== "OWNER") {
    throw new Error("Not authorized.");
  }
  return session.user;
}
