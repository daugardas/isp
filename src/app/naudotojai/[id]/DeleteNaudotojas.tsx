"use client";

import DangerButton from "@/components/DangerButton";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DeleteNaudotojas({
    naudotojasId,
}: {
    naudotojasId: number;
}) {
    const router = useRouter();

    const handleDeleteNaudotojas = async () => {
        const res = await fetch("/api/naudotojai/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: naudotojasId,
            }),
        });

        if (!res.ok) {
            console.log("nepavyko");
        } else {
            const body = await res.json();
            console.log(body);

            router.push("/naudotojai");
        }

        signOut();
    };

    return (
        <DangerButton onClick={handleDeleteNaudotojas}>Ištrinti</DangerButton>
    );
}
