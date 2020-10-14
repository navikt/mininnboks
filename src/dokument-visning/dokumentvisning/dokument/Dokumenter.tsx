import * as React from 'react';
import Dokument from './Dokument';
import {DokumentMetadata} from "../../../dokument";

interface Props {
    journalpostId: string;
    dokumentmetadata: DokumentMetadata[],
    lastNedPdfOnClick: (url : string, event : Event) => void,
    printPdfOnClick: (url : string, event : Event) => void
}

function Dokumenter (props: Props) {
    const vedleggListe = props.dokumentmetadata.map((vedlegg, index) =>
            <Dokument
                journalpostId={props.journalpostId}
                dokumentmetadata={vedlegg}
                dokref = {vedlegg.dokumentreferanse}
                key = {vedlegg.dokumentreferanse}
                lastNedPdfOnClick = {props.lastNedPdfOnClick}
                printPdfOnClick = {props.printPdfOnClick}
                first = {index === 0}
            />
    );

    return (
        <ul className="dokumentliste">
            {vedleggListe}
        </ul>
    );
};

export default Dokumenter;
