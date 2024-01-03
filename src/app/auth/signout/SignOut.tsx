"use client";

import Button from "@/components/Button";
import DangerButton from "@/components/DangerButton";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function SignOut() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col p-4 bg-zinc-800 gap-4">
      <p>Ar tikrai norite atsijungti?</p>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" onClick={() => router.back()} >Atšaukti</Button>
        <DangerButton type="button" onClick={() => signOut()}>
          Atsijungti
        </DangerButton>
      </div>
    </div>
  );
}
