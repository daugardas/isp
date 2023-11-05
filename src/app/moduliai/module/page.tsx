
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="p-4 bg-blue-500 w-full text-center flex flex-col items-center text-2xl font-semibold text-red-600 mb-1">
        <h1>Matematika1</h1>
      </div>
      <div className="flex flex-col items-center text-center text-1xl text-white-200 mb-2">
        <p>Modulio kodas:	P130B001</p>
        <p>Modulio pavadinimas: Matematika 1</p>
        <p>Modulio koordinuojantis dėstytojas: dr. LUKŠYS Kęstutis</p>
        <p>Modulio tikslas: Suteikti žinių apie pagrindines analizinės geometrijos, tiesinės algebros, vieno ir kelių kintamųjų funkcijų diferencialinio skaičiavimo sąvokas, teiginius, metodus bei tų metodų taikymą gamtos, technikos ir socialiniuose moksluose, matematinių modelių sudarymo pradmenis; supažindinti su pagrindinėmis matematikos programinės įrangos galimybėmis, reikalingomis uždaviniams spręsti.</p>
        <p>Modulio aprašymas: Įgyjama žinių apie matricų, determinantų savybes ir veiksmus su jais, įsisavinami tiesinių lygčių sistemų sprendimo būdai, vektorių veiksmai ir jų taikymai. Gebama sudaryti plokštumų ir tiesių erdvėje lygtis, analizuoti antros eilės kreives, apskaičiuoti funkcijų ribas, nustatyti funkcijų tolydumą, parinkti vieno ir kelių kintamųjų funkcijų diferencialinio skaičiavimo metodus, pademonstruoti matematikos metodų taikymus realių uždavinių sprendimui, suprasti funkcijų tyrimo metodus ir braižyti grafikus. Dalis uždavinių sprendžiama naudojantis matematikos programine įranga.</p>
      </div>
      <div className="flex flex-col items-center text-2xl font-semibold text-blue-600 mb-1">
        <h1>Atsiliepimai</h1>
      </div>
      <Link href="/moduliai/module/review" className="flex flex-col items-center mt-2 underline text-red-200">Atsiliepimas apie moduli</Link>
      <div className="flex flex-col items-center h-screen justify-center">
        <div className="flex flex-col items-center justify-bottom h-screen">
          <Link href="/moduliai" className="mt-4 underline text-blue-600">Atgal</Link>
        </div>
      </div>
      <div className="bg-blue-500 text-white p-4 w-screen">
        <ul className="flex flex-wrap justify-center">
          <li className="mx-4">
            <Link href="/moduliai/ai" className="text-1xl font-semibold hover:text-red-700">Sugeneruoti modulio antraštę</Link>
          </li>
          <li className="mx-4">
            <Link href="/moduliai/edit" className="text-1xl font-semibold hover:text-red-700">Koreguoti modulį</Link>
          </li>
          <li className="mx-4">
            <Link href="/moduliai/feedback" className="text-1xl font-semibold hover:text-red-700">Pridėti atsiliepimą</Link>
          </li>
          <li className="mx-4">
            <Link href="/moduliai/remove" className="text-1xl font-semibold hover:text-red-700">Pašalintį modulį</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}