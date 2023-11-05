import Link from 'next/link';

export default async function Home() {
  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="bg-blue-500 text-white p-4 w-screen">
        <div className="w-full text-center">Atsiliepimas</div>
      </div>
      <div className="flex-grow text-center">
        <p>Atsiliepimo autorius: Lukas Kuzmickas</p>
        <p>Modulis buvo idomus!</p>
        <p>2023-11-02</p>
        <p>8/10</p>
        <Link href="/moduliai/module" className="mt-4 underline text-blue-600">Atgal</Link>
      </div>
      <div className="bg-blue-500 text-white p-4 w-screen">
        <div className="w-full text-center">Komentarai</div>
        </div>
    </div>
  );
}
