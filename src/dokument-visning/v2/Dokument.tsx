import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Dokument as DokumentType, Journalpost } from './domain';
import DokumentVisning from './DokumentVisning';
import DokumentLenker from "./DokumentLenker";

interface Props {
    journalpost: Journalpost;
    dokument: DokumentType;
}

function Dokument(props: Props) {
    return (
        <li className="dokument">
            <div className="dokumentheader">
                <Element tag="h1">{props.dokument.tittel ?? 'Ukjent tittel'}</Element>
                <DokumentLenker journalpost={props.journalpost} dokument={props.dokument} />
            </div>
            <DokumentVisning journalpost={props.journalpost} dokument={props.dokument} />
        </li>
    );
}

export default Dokument;
