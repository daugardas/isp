
import Link from 'next/link';

export default async function Home() {
  const id = 1;
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="p-4 bg-blue-500 w-full text-center flex flex-col items-center text-2xl font-semibold text-red-600 mb-1">
        <h1>Dėstytojas</h1>
      </div>
      <div className="flex flex-col items-center text-center text-1xl text-white-200 mb-2">
        <p>Dėstytojas:	dr. LUKŠYS Kęstutis</p>
      </div>
      <div className="flex flex-col items-center text-2xl font-semibold text-blue-600 mb-1">
        <h1>Atsiliepimai</h1>
      </div>
      <Link href={`/destytojai/${id}/review`} className="flex flex-col items-center mt-2 underline text-red-200">Atsiliepimas apie dėstytoją</Link>
      <div className="flex flex-col items-center h-screen justify-center">
        <div className="flex flex-col items-center justify-bottom h-screen">
          <Link href="/destytojai" className="mt-4 underline text-blue-600">Atgal</Link>
        </div>
      </div>
      <div className="bg-blue-500 text-white p-4 w-screen">
        <ul className="flex flex-wrap justify-center">
          <li className="mx-4">
            <Link href="/destytojai/edit" className="text-1xl font-semibold hover:text-red-700">Koreguoti dėstytoją</Link>
          </li>
          <li className="mx-4">
            <Link href="/destytojai/feedback" className="text-1xl font-semibold hover:text-red-700">Atsiliepimas apie dėstytoją</Link>
          </li>
          <li className="mx-4">
            <Link href="/destytojai/remove" className="text-1xl font-semibold hover:text-red-700">Pašalintį dėstytoją</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}