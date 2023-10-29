'use client'

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/moduliai');
  };
//tailwindcss
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleFormSubmit}>
        <div>
          <input type="text" style={{
            color: 'red',
          }} placeholder='Modulio pavadinimas'/> 
        </div>
        <div className="flex items-center justify-center">
        <button className="flex justify-center" type="submit"> Patvirtinti </button>
        </div>
        
      </form>
      <Link href="/moduliai">Atgal</Link>
    </div>
  );
}