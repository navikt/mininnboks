import * as React from 'react';
import Dokument from './Dokument';
import { DokumentMetadata, JournalpostMetadata } from '../../../dokument';

interface Props {
    journalpostmetadata: JournalpostMetadata;
    dokumentmetadata: DokumentMetadata[];
    lastNedPdfOnClick: (url: string, event: React.MouseEvent) => void;
    printPdfOnClick: (url: string, event: React.MouseEvent) => void;
}

function Dokumenter(props: Props) {
    const vedleggListe = props.dokumentmetadata.map((vedlegg, index) => (
        <Dokument
            dokumentmetadata={vedlegg}
            dokref={vedlegg.dokumentreferanse ? vedlegg.dokumentreferanse : ''}
            key={vedlegg.dokumentreferanse}
            lastNedPdfOnClick={props.lastNedPdfOnClick}
            printPdfOnClick={props.printPdfOnClick}
            first={index === 0}
            journalpostmetadata={props.journalpostmetadata}
        />
    ));

    return <ul className="dokumentliste">{vedleggListe}</ul>;
}

export default Dokumenter;
