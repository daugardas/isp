import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      console.log(token);
      if (
        (token &&
          req.nextUrl.pathname !== "/login" &&
          req.nextUrl.pathname !== "/register") ||
        (!token &&
          (req.nextUrl.pathname === "/login" ||
            req.nextUrl.pathname === "/register" ||
            req.nextUrl.pathname === "/"))
      )
        return true;

      return false;
    },
  },
});
