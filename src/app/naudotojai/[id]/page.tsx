import InputWrap from "@/components/InputWrap";
import Label from "@/components/Label";
import prisma from "@/lib/db";
import CardWrap from "./CardWrap";
import CommentWrap from "./CommentWrap";
import { $Enums } from "@prisma/client";
import { auth } from "@/lib/auth";
import DangerButton from "@/components/DangerButton";
import NeutralButton from "@/components/NeutralButton";
import Tag from "./Tag";

/**
 * Renders a page for a specific user.

 * @param props.params - The URL parameters.
 * @param  props.params.id - The ID of the user to display.
 * @returns - The rendered page.
 */
export default async function Page({
    params,
}: Readonly<{ params: { id: string } }>) {
    const { id } = params;

    const naudotojas = await prisma.naudotojas.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!naudotojas) {
        return <div>Naudotojas nerastas</div>;
    }

    const session = await auth();
    let loggedIn = false;
    let isAdmin = false;
    let isSelf = false;

    if (session) {
        loggedIn = true;
        isAdmin = naudotojas.tipas === $Enums.NaudotojoTipas.administratorius;
        isSelf = session.user?.id === naudotojas.id.toString();
    }

    let fakultetas = null;

    if (naudotojas.fakultetasId) {
        fakultetas = await prisma.fakultetas.findUnique({
            where: {
                id: naudotojas.fakultetasId,
            },
        });
    }

    // const komentarai = await prisma.komentaras.findMany({
    //   where: {
    //     naudotojasId: naudotojas.id,
    //   },
    // });

    const komentarai: {
        id: number;
        komentaras: string;
        data: Date;
        naudotojasId: number;
        modulisId: number;
        atsakymasIKomentaraId: number | null;
    }[] = [
        {
            id: 1,
            komentaras: "Labai geras komentaras",
            data: new Date(),
            naudotojasId: 1,
            modulisId: 1,
            atsakymasIKomentaraId: null,
        },
        {
            id: 2,
            komentaras: "Labai geras komentaras",
            data: new Date(),
            naudotojasId: 1,
            modulisId: 1,
            atsakymasIKomentaraId: null,
        },
        {
            id: 3,
            komentaras: "Labai geras komentaras",
            data: new Date(),
            naudotojasId: 1,
            modulisId: 1,
            atsakymasIKomentaraId: null,
        },
    ];

    // const atsiliepimai = await prisma.atsiliepimas.findMany({
    //   where: {
    //     autoriusId: naudotojas.id,
    //   },
    // });

    const atsiliepimai: {
        id: number;
        tipas: $Enums.IvertinimoTipas;
        atsiliepimas: string;
        data: Date;
        autoriusId: number;
        modulisId: number;
    }[] = [
        {
            id: 1,
            tipas: $Enums.IvertinimoTipas.destytojo,
            atsiliepimas: "Labai geras atsiliepimas",
            data: new Date(),
            autoriusId: 1,
            modulisId: 1,
        },
        {
            id: 2,
            tipas: $Enums.IvertinimoTipas.destytojo,
            atsiliepimas: "Labai geras atsiliepimas",
            data: new Date(),
            autoriusId: 1,
            modulisId: 1,
        },
        {
            id: 3,
            tipas: $Enums.IvertinimoTipas.destytojo,
            atsiliepimas: "Labai geras atsiliepimas",
            data: new Date(),
            autoriusId: 1,
            modulisId: 1,
        },
        {
            id: 4,
            tipas: $Enums.IvertinimoTipas.modulio,
            atsiliepimas: "Labai geras atsiliepimas",
            data: new Date(),
            autoriusId: 1,
            modulisId: 1,
        },
    ];

    let zymos: {
        id: number;
        zyme: string;
        data: Date;
        naudotojasId: number;
    }[] = [];

    let pazymetasNaudotojas: {
        id: number;
        naudotojasId: number;
        zymeId: number;
        pazymetoNaudotojoId: number;
    } | null = null;

    if (session && !isSelf) {
        zymos = await prisma.zymes.findMany({
            where: {
                naudotojasId: Number(session.user?.id),
            },
        });

        pazymetasNaudotojas = await prisma.pazymetiNaudotojai.findUnique({
            where: {
                naudotojasId_pazymetoNaudotojoId: {
                    naudotojasId: Number(session.user?.id),
                    pazymetoNaudotojoId: naudotojas.id,
                },
            },
        });
    }

    return (
        <div className="mt-6 lg:w-3/12 max-w-lg w-8/12 flex flex-col items-center gap-4">
            <CardWrap className="gap-1 relative">
                <div className="flex flex-row w-full justify-between">
                    <h1 className="text-lg font-bold break-words">
                        {naudotojas.vardas}
                    </h1>
                    <Tag
                        className=""
                        availableTags={zymos}
                        currentTag={zymos.find(
                            (zyma) => zyma.id === pazymetasNaudotojas?.zymeId
                        )}
                        naudotojasId={naudotojas.id}
                    />
                </div>
                <InputWrap className="w-full">
                    <Label className="font-bold">El. paštas:</Label>
                    <p className="text-md break-words">
                        {naudotojas.el_pastas}
                    </p>
                </InputWrap>
                <InputWrap className="w-full">
                    <Label className="font-bold">Telefonas:</Label>
                    <p className="text-md">{naudotojas.telefonas}</p>
                </InputWrap>
                <InputWrap className="w-full">
                    <Label className="font-bold">Fakultetas:</Label>
                    <p className="text-md">
                        {fakultetas
                            ? fakultetas.pavadinimas
                            : "Naudotojas nepriklauso jokiam fakultetui."}
                    </p>
                </InputWrap>
                {loggedIn && (isAdmin || isSelf) && (
                    <div className="flex flex-row gap-2">
                        {isAdmin && <DangerButton>Ištrinti</DangerButton>}
                        {isSelf && <NeutralButton>Redaguoti</NeutralButton>}
                    </div>
                )}
            </CardWrap>

            <CardWrap>
                <h2 className="text-lg font-bold">Komentarai</h2>

                {komentarai.length === 0 ? (
                    <p className="text-md">Nėra komentarų</p>
                ) : (
                    <CommentWrap>
                        {komentarai.map((komentaras) => (
                            <div key={komentaras.id} className="flex flex-col">
                                <p className="text-md">
                                    {komentaras.komentaras}
                                </p>
                                <p className="text-sm">
                                    {komentaras.data.toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </CommentWrap>
                )}
            </CardWrap>

            <CardWrap>
                <h2 className="text-lg font-bold">Atsiliepimai</h2>
                {atsiliepimai.length === 0 ? (
                    <p className="text-md">Nėra atsiliepimų</p>
                ) : (
                    <CommentWrap>
                        {atsiliepimai.map((atsiliepimas) => (
                            <div
                                key={atsiliepimas.id}
                                className="flex flex-col items-center"
                            >
                                <p className="text-md">
                                    {atsiliepimas.atsiliepimas}
                                </p>
                                <p className="text-sm">
                                    {atsiliepimas.data.toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </CommentWrap>
                )}
            </CardWrap>
        </div>
    );
}
