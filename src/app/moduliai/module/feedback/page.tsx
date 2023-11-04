
import Link from 'next/link';

export default async function Home(){
  return (
    <>
    <div className="flex flex-col items-center text-2xl font-semibold text-red-600 mb-1">
    <h1>Atsiliepimas</h1>
    </div>
    <div className="flex flex-col items-center text-center text-1xl text-white-200 mb-2">
    <p>Atsiliepimo autorius: Lukas Kuzmickas</p>
    <p>Modulis buvo idomus!</p>
    <p>2023-11-02</p>
    <p>8/10</p>
    </div>
        <div className="flex flex-col items-center justify-bottom h-screen">
        <Link href="/moduliai/module" className="mt-4 underline text-blue-600">Atgal</Link>
      </div>
    </>
  );
}