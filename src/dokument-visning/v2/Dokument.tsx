import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Dokument as DokumentType, Journalpost } from './domain';
import DokumentVisning from './DokumentVisning';
import Lenke from "nav-frontend-lenker";
import { urls as dokumentUrls } from "./dokument-api";
import { ReactComponent as Download } from "./Download.svg";
import { ReactComponent as ExternalLink } from "./ExternalLink.svg";

interface Props {
    journalpost: Journalpost;
    dokument: DokumentType;
}

function Dokument(props: Props) {
    const dokumentUrl = dokumentUrls.dokument(props.journalpost.journalpostId, props.dokument.dokumentId);
    return (
        <li className="dokument">
            <div className="dokumentheader">
                <Element tag="h1">{props.dokument.tittel ?? 'Ukjent tittel'}</Element>
                <div className="dokumentheader__lenker">
                    <Lenke href={dokumentUrl} download>
                        <Download />
                        Last ned
                    </Lenke>
                    <Lenke href={dokumentUrl} target="_blank">
                        <ExternalLink />
                        Se i egen fane
                    </Lenke>
                </div>
            </div>
            <DokumentVisning journalpost={props.journalpost} dokument={props.dokument} />
        </li>
    );
}

export default Dokument;
