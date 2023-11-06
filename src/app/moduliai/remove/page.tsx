'use client'

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const id = 1;
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleDeleteModule = () => {
    if (password.trim() === '') {
      setError('Iveskite slaptažodį, kad užbaigtumėte ištrinimą.');
    } else {
      // Perform the delete module logic here
      router.push(`/moduliai/${id}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
      <h1 className="text-red-600 text-2xl mb-4">Ar tikrai norite ištrinti modulį?</h1>
      <div className="w-full max-w-md mx-auto p-4 rounded-lg bg-white">
        <p className="text-gray-700 text-lg mb-4">
          Įveskite savo slaptažodį norėdami patvirtinti trinimą.
        </p>
        <input
          type="password"
          className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4 text-gray-700"
          placeholder="Jūsų slaptažodis"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex items-center justify-center">
          <button
            onClick={handleDeleteModule}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          >
            Patvirtinti trinimą
          </button>
        </div>
      </div>
      <Link href={`/moduliai/${id}`} className="mt-4 underline text-blue-600">
        Atšaukti
      </Link>
    </div>
  );
}

