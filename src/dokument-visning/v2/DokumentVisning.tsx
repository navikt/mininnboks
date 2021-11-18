import * as React from 'react';
import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";
import {Dokument, Journalpost} from './domain';
import PdfViewer from '../../components/pdfvisning/PdfViewer';
import { urls as dokumentUrls } from './dokument-api';

interface Props {
    journalpost: Journalpost;
    dokument: Dokument;
}

function feilmelding(statusKode: number): string {
    switch (statusKode) {
        case 401:
        case 403:
            return 'Du har ikke tilgang til dette dokumentet.';
        case 404:
            return 'Dokument ikke funnet.';
        default:
            return 'Ukjent feil ved henting av dokument. Prøv å laste inn siden på nytt, og ta kontakt om feilen vedvarer. Feilkode: ' + statusKode;
    }
}

function DokumentVisning(props: Props) {
    if (!props.dokument.harTilgang) {
        return <AlertStripeAdvarsel>{feilmelding(401)}</AlertStripeAdvarsel>
    }

    return (
        <PdfViewer
            url={dokumentUrls.dokument(props.journalpost.journalpostId, props.dokument.dokumentId)}
            httpErrorHandler={feilmelding}
        />
    );
}

export default DokumentVisning;
