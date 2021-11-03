import * as React from 'react';
import { Dokument } from './domain';
import PdfViewer from '../../components/pdfvisning/PdfViewer';

interface Props {
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
            return 'Ukjent feil ved henting av dokument. Kontakt brukerstøtte. Feilkode: ' + statusKode;
    }
}

function DokumentVisning(props: Props) {
    return (
        <PdfViewer
            url={props.dokument.tittel ?? 'Magisk url her'} // TODO finn riktig url her
            httpErrorHandler={feilmelding}
        />
    );
}

export default DokumentVisning;
