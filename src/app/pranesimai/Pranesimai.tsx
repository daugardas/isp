// Pranesimai.tsx
"use client";
import React from "react";
import Link from "next/link";
import { MinimizedPranesimai } from "../api/pranesimai/search/route";
import { Session } from "inspector";
import Search from "./Search";
import { useSession } from "next-auth/react";

type PranesimaiProps = {
  messages: MinimizedPranesimai[]; // Adjust the type based on your data model
  isAdministrator: boolean;
};

export default function Pranesimai({ messages, isAdministrator }: PranesimaiProps) {

  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target.value;
    setSearch(search);
  };

  const handleSort = (criteria: string) => {
    if (sortBy === criteria) {
      setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };
  const sortedMessages = React.useMemo(() => {
    if (sortBy) {
      return [...messages].sort((a, b) => {
        if (sortBy === "tipas") {
          return sortOrder === "asc" ? a.tipas.localeCompare(b.tipas) : b.tipas.localeCompare(a.tipas);
        } else if (sortBy === "data") {
          const dateA = new Date(a.data).getTime();
          const dateB = new Date(b.data).getTime();
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        }
        return 0;
      });
    }
    return messages;
  }, [messages, sortBy, sortOrder]);

  return (
    <div>
      <div className="bg-blue-500 text-white p-4 mt-auto flex justify-between space-x-4">

        {isAdministrator && (
          <Link href="/pranesimai/send" className="text-1xl font-semibold hover:text-red-700">
            Siųsti pranešimą
          </Link>
        )}
        <Link href="/pranesimai/delete" className="text-1xl font-semibold hover:text-red-700">Trinti pranešimą</Link>
        <Link href="/pranesimai/settings" className="text-1xl font-semibold hover:text-red-700">Pranešimų nustatymai</Link>
      </div>

      <Search search={search} handleSearch={handleSearch} />
      <h1 className="text-2xl">Pranešimai</h1>
      <table className="w-full border border-golden-900 mt-4">
        <thead className="bg-golden">
          <tr>
            <th className={`p-2 border-r border-golden text-left cursor-pointer`} onClick={() => handleSort("tipas")}>
              Pranešimo tipas {sortBy === "tipas" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th className="p-2 border-r border-golden text-left">Tekstas</th>
            <th className={`p-2 border-r border-golden text-left cursor-pointer`} onClick={() => handleSort("data")}>
              Data {sortBy === "data" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            {/*<th className="p-2 text-left">Naudotojas</th>*/}
          </tr>
        </thead>
        <tbody>
          {sortedMessages.filter((message) => message.tipas.includes(search)).map((message) => (
            <tr key={message.id}>
              <td className="p-2 border-r border-b border-golden">{message.tipas}</td>
              <td className="p-2 border-r border-b border-golden">{message.tekstas}</td>
              <td className="p-2 border-r border-b border-golden">{message.data.toDateString()}</td>
              {/*<td className="p-2 border-b border-golden">{message.naudotojas.vardas}</td>
              {/* Render other message details as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}