import {useEffect, useState} from "react";
import type { Kerekpar } from "./types";


export function KerekparLista() {
    const [kerekparok, setKerekparok] = useState<Kerekpar[]>([]);

    async function fetchKerekparok() {
        const valasz = await fetch("/kerekparok.json");
        const kerekparok = await valasz.json();
        setKerekparok(kerekparok);
    }

    const kerekparokszama = kerekparok.length;

    const legolcsobbberles = kerekparok.reduce((legolcsobb, kerekpar) => {
        if (kerekpar.napiDij < legolcsobb.napiDij) {
            return kerekpar;
        }
        return legolcsobb;
    }, kerekparok[0] || { napiDij: Infinity });

    const legdragabbberles = kerekparok.reduce((legdragabb, kerekpar) => {
        if (kerekpar.napiDij > legdragabb.napiDij) {
            return kerekpar;
        }
        return legdragabb;
    }, kerekparok[0] || { napiDij: -Infinity });

    useEffect(() => {
        fetchKerekparok();
    }, []);

    return (
        <div>
            <h1>Kerekparok</h1>
            <p>A kerekparok szama: {kerekparokszama}</p>
            <p>A legolcsobb bérles: {legolcsobbberles.napiDij} Ft</p>
            <p>A legdragabb bérles: {legdragabbberles.napiDij} Ft</p>
        </div>
    );

}