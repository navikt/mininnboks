import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import {Dokumenter, DokumentMetadata, JournalpostMetadata} from "./domain";
import DokumentVisning from "./DokumentVisning";

interface Props {
    dokument: DokumentMetadata;
    journalpostMetadata: JournalpostMetadata;
    inlinePdf: boolean;
}

function Dokument(props: Props) {
    const pdfVisning = props.inlinePdf ? (<DokumentVisning dokument={props.dokument}/>) : null;
    const divProps = props.inlinePdf ? {} : { tabIndex: 0 };
    return (
        <>
            <div className="dokumentheader blokk-xxxs" {...divProps} >
                <Element tag="h1">{props.dokument.tittel}</Element>
            </div>
            {pdfVisning}
        </>
    );
}

export default Dokument