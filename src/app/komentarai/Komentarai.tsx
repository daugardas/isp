// Komentarai.tsx
import React from 'react';
import Link from "next/link";
import { KomentaraiProps } from './interfaces';

const Komentarai: React.FC<KomentaraiProps> = ({ komentarai }) => {
    return (
        <>
            <h1 className="text-2xl">Komentarai</h1>
            <div className="w-5/6 flex flex-col gap-4 items-center">
                {komentarai.map((komentaras) => (
                    <div
                        key={komentaras.id}
                        className="w-full max-w-2xl py-2 flex text-neutral-300 bg-zinc-900 hover:bg-zinc-800 border border-none rounded-lg justify-center transition duration-50"
                    >
                        <p>ID: {komentaras.id}</p>
                        <p>Data: {komentaras.data.toLocaleDateString()}</p>
                        <p>Komentaras: {komentaras.komentaras}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Komentarai;
