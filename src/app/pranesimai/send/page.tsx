'use client'

import { auth } from "@/lib/auth";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import React, { useState  } from "react";

export default  function Page() {
  const router = useRouter();
  const [message, setMessage] = useState(''); // Initialize the message state

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/pranesimai');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-lg text-gray-700">Siuntėjas</label>
          <input
            type="text"
            className="w-64 py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
            placeholder="Įveskite vardą"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg text-gray-700">Gavėjas</label>
          <input
            type="text"
            className="w-64 py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
            placeholder="Įveskite adresata"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg text-gray-700">Žinutė</label>
          <textarea
            value={message}
            onChange={handleInputChange}
            className="w-96 py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
            placeholder="Jūsų žinutė eina čia"
            rows={3}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-800 transition duration-300 text-white py-2 px-4 rounded-md">
            Siūsti
          </button>
        </div>

        <div className="flex flex-col items-left justify-center h-screen text-gray-500">
          <Link href="/pranesimai" className="hover:text-black transition duration-300">Grįžti atgal į pranešimus</Link>
        </div>
      </form>
    </div>
  );
}
