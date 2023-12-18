// Pranesimai.tsx
"use client";
import React from "react";
import Link from "next/link";
import { MinimizedPranesimai } from "../../api/pranesimai/search/route";
import { Session } from "inspector";
import Search from "../Search";
import { useRouter } from "next/navigation";

type PranesimaiProps = {
  messages: MinimizedPranesimai[]; // Adjust the type based on your data model
};

export default function Pranesimai({ messages }: PranesimaiProps) {
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [selectedMessages, setSelectedMessages] = React.useState<number[]>([]);

  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target.value;
    setSearch(search);
  };

  const handleSort = (criteria: string) => {
    if (sortBy === criteria) {
      setSortOrder((prevSortOrder) =>
        prevSortOrder === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };
  const handleCheckboxChange = (messageId: number) => {
    setSelectedMessages((prevSelectedMessages) => {
      if (prevSelectedMessages.includes(messageId)) {
        // If the message is already selected, remove it
        return prevSelectedMessages.filter((id) => id !== messageId);
      } else {
        // If the message is not selected, add it
        return [...prevSelectedMessages, messageId];
      }
    });
  };
  const handleDeleteSelected = async () => {
    console.log("Deleting messages:", selectedMessages);

    const res = await fetch("/api/pranesimai/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageID: selectedMessages }),
    });

    if (!res.ok) {
      console.log("nepavyko");
    } else {
      const body = await res.json();
      console.log(body);
      router.refresh();
    }
  };

  const sortedMessages = React.useMemo(() => {
    if (sortBy) {
      return [...messages].sort((a, b) => {
        if (sortBy === "tipas") {
          return sortOrder === "asc"
            ? a.tipas.localeCompare(b.tipas)
            : b.tipas.localeCompare(a.tipas);
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
      <Search search={search} handleSearch={handleSearch} />
      <h1 className="text-2xl">Pranešimai</h1>
      <h2 className="text-2xl text-right">
        <button
          onClick={handleDeleteSelected}
          disabled={selectedMessages.length === 0}
          className="hover:bg-red-800 transition duration-400 py-2 px-4 rounded-md mr-10"
        >
          Ištrinti pažymėtus pranešimus
        </button>
      </h2>

      <table className="w-full border border-golden mt-4">
        <colgroup>
          <col style={{ width: "20%" }} />
          <col style={{ width: "60%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "5%" }} />
        </colgroup>
        <thead className="bg-golden">
          <tr>
            <th
              className={`p-2 border-r border-golden text-left cursor-pointer`}
              onClick={() => handleSort("tipas")}
            >
              Pranešimo tipas{" "}
              {sortBy === "tipas" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th className="p-2 border-r border-golden text-left">Tekstas</th>
            <th
              className={`p-2 border-r border-golden text-left cursor-pointer`}
              onClick={() => handleSort("data")}
            >
              Data {sortBy === "data" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            {/*<th className="p-2 text-left">Naudotojas</th>*/}
          </tr>
        </thead>

        <tbody>
          {sortedMessages
            .filter((message) => message.tipas.includes(search))
            .map((message) => (
              <tr key={message.id}>
                <td className="p-2 border-r border-b border-golden">
                  {message.tipas}
                </td>
                <td className="p-2 border-r border-b border-golden">
                  {message.tekstas}
                </td>
                <td className="p-2 border-r border-b border-golden">
                  {message.data.toDateString()}
                </td>
                <td className="p-2 border-r border-b border-golden">
                  <input
                    type="checkbox"
                    checked={selectedMessages.includes(message.id)}
                    onChange={() => handleCheckboxChange(message.id)}
                  />
                </td>
                {/*<td className="p-2 border-b border-golden">{message.naudotojas.vardas}</td>
              {/* Render other message details as needed */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
