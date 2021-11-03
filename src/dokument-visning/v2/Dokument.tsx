import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Dokument as DokumentType, Journalpost } from './domain';
import DokumentVisning from './DokumentVisning';

interface Props {
    journalpost: Journalpost;
    dokument: DokumentType;
}

function Dokument(props: Props) {
    return (
        <>
            <div className="dokumentheader blokk-xxxs">
                <Element tag="h1">{props.dokument.tittel ?? 'Ukjent tittel'}</Element>
            </div>
            <DokumentVisning dokument={props.dokument} />
        </>
    );
}

export default Dokument;
