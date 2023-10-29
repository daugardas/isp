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
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 style={{
            color: 'red',
          }}>Modulio redagavimas</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center justify-center">
        <button className="flex justify-center" type="submit"> Patvirtinti </button>
        </div>
        
      </form>
      <Link href="/moduliai">Atgal</Link>
    </div>
  );
}