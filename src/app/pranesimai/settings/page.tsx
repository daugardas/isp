import { auth } from "@/lib/auth";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import SettingsForm from "./settingsForm";
import prisma from "@/lib/db";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
  


  const originalSettings = await prisma.pranesimuNustatymai.findFirst({
    where: {
      naudotojas: {
        id: Number(session.user?.id)
      }
    }
  })

  if (!originalSettings){
    redirect("/");
  }

  return (
    <>
    <h1 className="text-2xl">Pranešimų nustatymai</h1>
    <div className="w-5/6 flex flex-col items-center gap-4 h-screen text-gray-500">
      <SettingsForm originalSettings={originalSettings} />
      {/* <div className="flex flex-col items-left justify-center h-screen text-gray-500">
        <Link href="/pranesimai" className="hover:text-black transition duration-300">Grįžti atgal į pranešimus</Link>
      </div> */}
    </div>
    </>
  );
}
