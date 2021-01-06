import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import Personalia from './dokumentvisning/personalia/Personalia';
import Dokumenter from './dokumentvisning/dokument/Dokumenter';
import './dokument-visning.less';
import { useEffect } from 'react';
import { DokumentMetadata, Journalpostmetadata } from '../dokument';

interface Props {
    dokumentmetadata: DokumentMetadata[];
    lastNedPdfOnClick: (url: string, event: React.MouseEvent) => void;
    printPdfOnClick: (url: string, event: React.MouseEvent) => void;
    journalpostmetadata: Journalpostmetadata;
}

function DokumentVisning(props: Props) {
    useEffect(() => {
        document.body.scrollTop = 1;
        document.documentElement.scrollTop = 1;
    }, []);

    const { temakode } = props.journalpostmetadata.resultat;

    return (
        <div className="dokinnsyn">
            <section className="dokumentvisning-header blokk-m">
                <Personalia journalpostmetadata={props.journalpostmetadata} className="blokk-m" />
                <ul className="ustilet">
                    <li>
                        <Lenke href={`/saksoversikt/app/tema/${temakode}`}>Gå til saksoversikt</Lenke>
                    </li>
                    <li>
                        <Lenke
                            href="https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/skriv+til+oss/"
                            className="lenke"
                        >
                            Kontakt NAV om dokumentet
                        </Lenke>
                    </li>
                </ul>
            </section>
            <section className="dokumenter">
                <Dokumenter
                    journalpostId={props.journalpostmetadata.resultat.journalpostId}
                    dokumentmetadata={props.dokumentmetadata}
                    lastNedPdfOnClick={props.lastNedPdfOnClick}
                    printPdfOnClick={props.printPdfOnClick}
                />
            </section>
        </div>
    );
}

export default DokumentVisning;
