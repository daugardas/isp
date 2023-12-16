// Pranesimai.tsx
import React from "react";
import Link from "next/link";
import { MinimizedPranesimai } from "../api/pranesimai/search/route";

type PranesimaiProps = {
  messages: MinimizedPranesimai[]; // Adjust the type based on your data model
};

export default function Pranesimai({ messages }: PranesimaiProps) {
  return (
    <div>
      <div className="bg-blue-500 text-white p-4 mt-auto flex justify-between space-x-4">
        <Link href="/pranesimai/send" className="text-1xl font-semibold hover:text-red-700">Siūsti pranešimą</Link>
        <Link href="/pranesimai/delete" className="text-1xl font-semibold hover:text-red-700">Trinti pranešimą</Link>
        <Link href="/pranesimai/settings" className="text-1xl font-semibold hover:text-red-700">Pranešimų nustatymai</Link>
      </div>


      <h1>Pranešimai</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <p>
              <strong>Pranešimo tipas:</strong> {message.tipas}
            </p>
            <p>
              <strong>Tekstas:</strong> {message.tekstas}
            </p>
            <p>
              <strong>Data:</strong> {message.data.getDate()}
            </p>
            <p>
              <strong>Naudotojas:</strong> {message.naudotojas.vardas}
            </p>
            {/* Render other message details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}
