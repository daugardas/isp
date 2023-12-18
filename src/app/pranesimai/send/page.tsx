import prisma from '@/lib/db';
import PranesimaiForm from './PranesimaiForm';
import { Naudotojas, PranesimoTipas } from "@prisma/client";
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session || !session.user) {
      redirect("/");
  }
  const naudotojai = await prisma.naudotojas.findMany();
  const tipai: PranesimoTipas[] = [PranesimoTipas.sisteminis, PranesimoTipas.modulio,
     PranesimoTipas.komentaro_reakcija, PranesimoTipas.destytojo, PranesimoTipas.atsakymas_i_komentara];
  
  return (
    <PranesimaiForm naudotojai={naudotojai} tipai={tipai} />
  )
}
