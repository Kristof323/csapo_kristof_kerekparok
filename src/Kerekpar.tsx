import react from "react";
import {useEffect, useState} from "react";
import {KerekparLista} from "./kerekparLista";
import type { Kerekpar } from "./types";




export function Kerekpar() {
    const [kerekparok, setKerekparok] = useState<Kerekpar[]>([]);

        async function fetchKerekparok() {
        const valasz = await fetch("/kerekparok.json");
        const kerekparok = await valasz.json();
        setKerekparok(kerekparok);
    }

    useEffect(() => {
        fetchKerekparok();
    }, []);

    useEffect(() => {
        async function reszletek() {
            const valasz = await fetch("/kerekparok.json");
            const kerekparok = await valasz.json();
            setKerekparok(kerekparok);
        }
        reszletek();
    }, []);

        

    const kartyak = kerekparok.map((kerekpar) => (
        <div key={kerekpar.id} className="col-12 col-md-6 col-lg-4">
            <div className="card" style={{ width: "18rem; color: white" }}>
                <div className="card-body">
                    <h3 className="card-title" style={{ color: kerekpar.szin }}>{kerekpar.nev}</h3>
                    <p className="card-text"><em>Tipus: {kerekpar.tipus}</em></p>
                    <p className="card-text"><u>Napi dij: {kerekpar.napiDij} Ft</u></p>
                    <button className="btn btn-primary">Részletek</button>
                   )
                </div>
            </div>
        </div>
    ));
        
     useState( {reszletek; SetReszletek} boolean = buttonClick ? true : false

    return (
        <div className="kerekparok-container row g-3">
            {kartyak}
        </div>
    );
}