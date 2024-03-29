import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "@auth/core" {
  interface User {
    id: string;
    email: string;
  }

  interface Session {
    user?: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
  }

  interface Session {
    user?: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}
