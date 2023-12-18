"use client";
import { Naudotojas, PranesimoTipas } from "@prisma/client";
import { User } from "next-auth";
import { Router } from "next/router";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PranesimaiForm({
  naudotojai,
  tipai,
}: {
  naudotojai: Naudotojas[];
  tipai: PranesimoTipas[];
}) {
  const [message, setMessage] = useState("");
  const [selectedId, setSelectedId] = useState<number>(naudotojai[0].id);
  /* const [pranesimoTipas, setTipas] = useState<string>(tipai[0]); */
  const [pranesimoTipas, setTipas] = useState<string>(
    tipai.length > 0 ? tipai[0] : ""
  );
  const router = useRouter();

  const handleFormSubmit = async () => {
    console.log("Pridedamas pranesimas:", message);

    const res = await fetch("/api/pranesimai/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageText: message,
        messageType: pranesimoTipas,
        userID: selectedId,
      }),
    });

    if (!res.ok) {
      console.log("nepavyko");
    } else {
      const body = await res.json();
      console.log(body);
      router.refresh();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit} className="mt-4 !text-white">
      <div className="mb-4">
        <label className="block text-lg">Gavėjas</label>
        <select
          className="text-black"
          name="gavejas"
          value={selectedId}
          onChange={(e) => setSelectedId(Number(e.target.value))}
        >
          {naudotojai.map((naudotojas) => (
            <option key={naudotojas.id} value={naudotojas.id}>
              {naudotojas.vardas}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-lg">Pranešimo tipas</label>
        <select
          className="text-black"
          name="tipas"
          value={pranesimoTipas}
          onChange={(e) => setTipas(e.target.value)}
        >
          {tipai.map((pranesimoTipas) => (
            <option key={pranesimoTipas} value={pranesimoTipas}>
              {pranesimoTipas}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="block text-lg">Žinutė</label>
        <textarea
          value={message}
          onChange={handleInputChange}
          className="w-96 py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black" // Change text color
          placeholder="Jūsų žinutė eina čia"
          rows={3}
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={message.length === 0}
          className="bg-red-800 hover:bg-blue-600 transition duration-400 py-3 px-6 rounded-md mr-20"
        >
          Siųsti
        </button>
        <a href="./" className="text-white text-decoration-none">
          <button
            type="button" // Set type to "button" since it's not a form submission
            className="bg-red-800 hover:bg-blue-600 transition duration-400 py-3 px-6 rounded-md ml-20"
          >
            Grįžti atgal
          </button>
        </a>
      </div>

      <div className="flex flex-col items-left justify-center h-screen text-gray-500">
        {/* Your existing Link component... */}
      </div>
    </form>
  );
}
