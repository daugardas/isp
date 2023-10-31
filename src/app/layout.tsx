import "./globals.css";
import type { Metadata } from "next";
import { GeistMono, GeistSans } from "geist/font";
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
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistSans.className}`}
      >
        <div className="flex flex-col justify-between w-full h-full min-h-screen">
          <Nav />
          <main className="flex-auto w-full mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
