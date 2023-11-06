import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";

export default async function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
