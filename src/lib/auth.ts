import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Naudotojas } from "@prisma/client";
import prisma from "@/lib/db";
import { compare } from "bcryptjs";
import { User } from "next-auth/types";

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
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const naudotojas: Naudotojas | null =
          await prisma.naudotojas.findUnique({
            where: { el_pastas: credentials.email as string },
          });

        if (
          naudotojas &&
          (await compare(
            credentials.password as string,
            naudotojas.slaptazodis
          ))
        ) {
          return {
            id: naudotojas.id.toString(),
            email: naudotojas.el_pastas,
          } as User;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
    error: "/auth/error",
    signOut: "/auth/signout",
  },
  callbacks: {
    jwt({ token, user, account }) {
      if (token && user) {
        token.id = user.id;
      }
      return token;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(authConfig);
