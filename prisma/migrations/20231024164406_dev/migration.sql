-- CreateEnum
CREATE TYPE "NaudotojoTipas" AS ENUM ('administratorius', 'destytojas', 'studentas');

-- CreateTable
CREATE TABLE "Naudotojas" (
    "id" SERIAL NOT NULL,
    "el_pastas" TEXT NOT NULL,
    "slaptazodis" TEXT NOT NULL,
    "vardas" TEXT NOT NULL,
    "telefonas" TEXT NOT NULL,
    "tipas" "NaudotojoTipas" NOT NULL,
    "pranesimuNustatymaiId" INTEGER NOT NULL,

    CONSTRAINT "Naudotojas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PranesimuNustatymai" (
    "id" SERIAL NOT NULL,
    "komentaro_reakcija" BOOLEAN NOT NULL,
    "atsakymas_i_komentara" BOOLEAN NOT NULL,
    "sisteminis_naudotojo_pranesimas" BOOLEAN NOT NULL,
    "siusti_email_sisteminis_pranesimas" BOOLEAN NOT NULL,
    "siusti_email_atsakymas_i_komentara" BOOLEAN NOT NULL,
    "siusti_email_komentaro_reakcija" BOOLEAN NOT NULL,

    CONSTRAINT "PranesimuNustatymai_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Naudotojas_el_pastas_key" ON "Naudotojas"("el_pastas");

-- CreateIndex
CREATE UNIQUE INDEX "Naudotojas_telefonas_key" ON "Naudotojas"("telefonas");

-- CreateIndex
CREATE UNIQUE INDEX "Naudotojas_pranesimuNustatymaiId_key" ON "Naudotojas"("pranesimuNustatymaiId");

-- AddForeignKey
ALTER TABLE "Naudotojas" ADD CONSTRAINT "Naudotojas_pranesimuNustatymaiId_fkey" FOREIGN KEY ("pranesimuNustatymaiId") REFERENCES "PranesimuNustatymai"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
