import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Naudotojas } from "@prisma/client";
import prisma from "@/lib/db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
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
        // if (!credentials || !credentials.email || !credentials.password) {
        //   return null;
        // }

        // const naudotojas: Naudotojas | null =
        //   await prisma.naudotojas.findUnique({
        //     where: { el_pastas: credentials.email },
        //   });

        // if (
        //   naudotojas &&
        //   (await compare(credentials.password, naudotojas.slaptazodis))
        // ) {
        //   // return user without any sensitive information
        //   return {
        //     id: naudotojas.id,
        //     email: naudotojas.el_pastas,
        //   };
        // }

        return { id: "156ds", email: "test@test"};
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      return { ...session, user: { id: token.id, email: token.email } };
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
};
