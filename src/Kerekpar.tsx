import {useEffect, useState} from "react";
import type { Kerekpar } from "./types";




export function Kerekpar() {
    const [kerekparok, setKerekparok] = useState<Kerekpar[]>([]);
    const [lathatoReszletek, setLathatoReszletek] = useState<Record<string, boolean>>({});

    async function fetchKerekparok() {
        const valasz = await fetch("/kerekparok.json");
        const kerekparok = await valasz.json();
        setKerekparok(kerekparok);
    }

    useEffect(() => {
        fetchKerekparok();
    }, []);

    const kartyak = kerekparok.map((kerekpar) => (
        <div key={kerekpar.id} className="col-12 col-md-6 col-lg-4">
            <div className="card" style={{ width: "18rem", color: "white" }}>
                <div className="card-body">
                    <button
                        className="btn btn-primary"
                        onClick={() => setLathatoReszletek((elozo) => ({
                            ...elozo,
                            [kerekpar.id]: !elozo[kerekpar.id],
                        }))}
                    >
                        {lathatoReszletek[kerekpar.id] ? "Részletek elrejtése" : "Részletek"}
                    </button>
                    {lathatoReszletek[kerekpar.id] && (
                        <div>
                            <h3 className="card-title" style={{ color: kerekpar.szin }}>{kerekpar.nev}</h3>
                            <p className="card-text"><em>Típus: {kerekpar.tipus}</em></p>
                            <p className="card-text"><u>Napi díj: {kerekpar.napiDij} Ft</u></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ));

    return (
        <div className="kerekparok">
            {kartyak}
        </div>
    );
}