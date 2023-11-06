import Link from 'next/link';

export default async function Home() {
  const id = 1;
  return (
    <div className="flex flex-col h-screen justify-center bg-gray-100">
      <div className="bg-blue-500 text-white p-4 w-screen">
        <div className="w-full text-center text-3xl font-semibold">Atsiliepimas</div>
      </div>
      <div className="flex-grow text-center p-6 text-black">
        <div className="bg-white p-4 rounded-md shadow-lg">
          <p className="text-2xl font-semibold ">Atsiliepimo autorius: Lukas Kuzmickas</p>
          <p className="text-xl">Modulis buvo labai idomus!</p>
          <p className="text-lg">2023-11-02</p>
          <p className="text-xl">Vertinimas: 8/10</p>
          <Link href={`/moduliai/${id}`} className="mt-4 underline text-blue-600 text-lg">Atgal</Link>
        </div>
      </div>
      <div className="bg-blue-500 text-white p-4 w-screen">
        <div className="w-full text-center text-3xl font-semibold">Komentarai</div>
      </div>
    </div>
  );
}