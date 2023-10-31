'use client'

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/moduliai');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleFormSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-lg text-gray-700">Modulio pavadinimas</label>
          <input
            type="text"
            className="w-64 py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
            placeholder="Įveskite pavadinimą"
          />
        </div>

        {/* Additional Input Fields */}
        <div className="mb-4">
          <label className="block text-lg text-gray-700">Kitas laukas</label>
          <input
            type="text"
            className="w-64 py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
            placeholder="Įveskite kitą informaciją"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg text-gray-700">Trečias laukas</label>
          <input
            type="text"
            className="w-64 py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
            placeholder="Įveskite trečią informaciją"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg text-gray-700">Ketvirtas laukas</label>
          <input
            type="text"
            className="w-64 py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
            placeholder="Įveskite ketvirtą informaciją"
          />
        </div>


        <div className="mb-4">
          <label className="block text-lg text-gray-700">Penktas laukas</label>
          <input
            type="text"
            className="w-64 py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
            placeholder="Įveskite penktą informaciją"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            Patvirtinti
          </button>
        </div>
      </form>
      <Link href="/moduliai" className="mt-4 underline text-blue-500">Atgal</Link>
    </div>
  );
}