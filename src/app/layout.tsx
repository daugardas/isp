import "./globals.css";
import type { Metadata } from "next";
import { GeistMono, GeistSans } from "geist/font";
import { NextAuthProvider } from "./providers";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Informacine sistema",
  description: "Informacine sistema skirta vertinti KTU modulius ir destytojus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${GeistSans.className}`}>
        <NextAuthProvider>
          <Nav />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
