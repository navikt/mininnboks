import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Dokument as DokumentType, Journalpost } from './domain';
import { urls as dokumentUrls } from './dokument-api';
import { ReactComponent as Download } from './Download.svg';
import { ReactComponent as ExternalLink } from './ExternalLink.svg';

interface Props {
    journalpost: Journalpost;
    dokument: DokumentType;
}

function DokumentLenker(props: Props) {
    const { journalpost, dokument } = props;
    if (!dokument.harTilgang) {
        return null;
    }

    const dokumentUrl = dokumentUrls.dokument(journalpost.journalpostId, dokument.dokumentId);
    return (
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
    );
}

export default DokumentLenker;
