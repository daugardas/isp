import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Naudotojas } from "@prisma/client";
import prisma from "@/lib/db";
import { compare } from "bcrypt";

const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "signIn",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        return null;
      },
    }),
  ],
};

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(authConfig);