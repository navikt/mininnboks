import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import Personalia from './dokumentvisning/personalia/Personalia';
import Dokumenter from './dokumentvisning/dokument/Dokumenter';
import './dokument-visning.less';
import { DokumentMetadata, JournalpostMetadata } from '../../dokument';
import { getNAVBaseUrl } from '../../environment';
import { useScrollToTop } from '../../utils/custom-hooks';

interface Props {
    dokumentmetadata: DokumentMetadata[];
    lastNedPdfOnClick: (url: string, event: React.MouseEvent) => void;
    printPdfOnClick: (url: string, event: React.MouseEvent) => void;
    journalpostmetadata: JournalpostMetadata;
}

function DokumentVisning(props: Props) {
    useScrollToTop();

    const { temakode } = props.journalpostmetadata.resultat;
    const sendNyMeldingURL = `${getNAVBaseUrl()}/person/kontakt-oss/skriv-til-oss`;

    return (
        <div className="dokinnsyn">
            <section className="dokumentvisning-header blokk-m">
                <Personalia journalpostmetadata={props.journalpostmetadata} className="blokk-m" />
                <ul className="ustilet">
                    <li>
                        <Lenke href={`/saksoversikt/app/tema/${temakode}`}>Gå til saksoversikt</Lenke>
                    </li>
                    <li>
                        <Lenke href={sendNyMeldingURL} className="lenke">
                            Kontakt NAV om dokumentet
                        </Lenke>
                    </li>
                </ul>
            </section>
            <section className="dokumenter">
                <Dokumenter
                    journalpostmetadata={props.journalpostmetadata}
                    dokumentmetadata={props.dokumentmetadata}
                    lastNedPdfOnClick={props.lastNedPdfOnClick}
                    printPdfOnClick={props.printPdfOnClick}
                />
            </section>
        </div>
    );
}

export default DokumentVisning;