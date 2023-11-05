'use client'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/moduliai/module');
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
      <h1 className="text-4xl font-semibold text-red-600 mb-6">Modulio atsiliepimai</h1>
      <form onSubmit={handleFormSubmit} className="w-full max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-lg text-gray-700">Jūsų vardas</label>
          <input
            type="text"
            className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
            placeholder="Įveskite savo vardą"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg text-gray-700">El. pašto adresas</label>
          <input
            type="email"
            className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
            placeholder="Įveskite savo el. pašto adresą"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg text-gray-700">Atsiliepimo tema</label>
          <input
            type="text"
            className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
            placeholder="Įveskite atsiliepimo temą"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg text-gray-700">Jūsų atsiliepimas</label>
          <textarea
            className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
            rows={4}
            placeholder="Įveskite savo atsiliepimą"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Patvirtinti
          </button>
        </div>
      </form>
      <Link href="/moduliai/module" className="mt-4 underline text-blue-600">
        Atgal
      </Link>
    </div>
  );
}