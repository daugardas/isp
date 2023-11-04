import prisma from "@/lib/db";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const naudotojas = await prisma.naudotojas.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!naudotojas) {
    return <div>Naudotojas nerastas</div>;
  }

  let fakultetas = null;

  if (naudotojas.fakultetasId) {
    fakultetas = await prisma.fakultetas.findUnique({
      where: {
        id: naudotojas.fakultetasId,
      },
    });
  }

  const komentarai = await prisma.komentaras.findMany({
    where: {
      naudotojasId: naudotojas.id,
    },
  });

  const atsiliepimai = await prisma.atsiliepimas.findMany({
    where: {
      autoriusId: naudotojas.id,
    },
  });

  return (
    <div className="mt-6  w-8/12 max-w-lg flex flex-col items-center">
      <h1 className="text-3xl font-bold">{naudotojas.vardas}</h1>
      <p className="text-lg">{naudotojas.el_pastas}</p>
      <p className="text-lg">{naudotojas.telefonas}</p>
      {fakultetas && <p className="text-lg">{fakultetas.pavadinimas}</p>}

      <div className="flex felx-col items-center">
        {komentarai.length > 0 ? (
          <h2 className="text-xl">Komentarai</h2>
        ) : (
          <h2 className="text-xl">Nėra komentarų</h2>
        )}
        {komentarai.map((komentaras) => (
          <div key={komentaras.id} className="flex flex-col items-center">
            <p className="text-md">{komentaras.komentaras}</p>
            <p className="text-sm">{komentaras.data.toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      <div className="flex felx-col items-center">
        {atsiliepimai.length > 0 ? (
          <h2 className="text-xl">Atsiliepimai</h2>
        ) : (
          <h2 className="text-xl">Nėra atsiliepimų</h2>
        )}
        {atsiliepimai.map((atsiliepimas) => (
          <div key={atsiliepimas.id} className="flex flex-col items-center">
            <p className="text-md">{atsiliepimas.atsiliepimas}</p>
            <p className="text-sm">{atsiliepimas.data.toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
