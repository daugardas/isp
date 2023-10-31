import { auth } from "@/lib/auth";

export default auth((req) => {
  // req.auth === null -> unauthenticated
});

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
