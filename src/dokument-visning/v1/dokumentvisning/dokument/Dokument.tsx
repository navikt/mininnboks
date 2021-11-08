import * as React from 'react';
import DokumentSide from './DokumentSide';
import DokumentHeader from './DokumentHeader';
import Lenke from 'nav-frontend-lenker';
import { DokumentMetadata, JournalpostMetadata } from '../../../../dokument';
import { useScrollToTop } from '../../../../utils/custom-hooks';

const lagDokumentTittel = (kanVises: boolean, ekstrafeilinfo: { [key: string]: string }, tittel: string) => {
    if (kanVises) {
        return <h1 className="typo-element">{tittel}</h1>;
    } else if (ekstrafeilinfo.korruptPdf === 'true') {
        return <h1 className="typo-element">{ekstrafeilinfo.tittel}</h1>;
    }
    return null;
};

interface Props {
    dokref: string;
    first: boolean;
    journalpostmetadata: JournalpostMetadata;
    lastNedPdfOnClick: (url: string, event: React.MouseEvent) => void;
    printPdfOnClick: (url: string, event: React.MouseEvent) => void;
    dokumentmetadata: DokumentMetadata;
}

function Dokument(props: Props) {
    const { bildeurler, kanVises, feilmelding, ekstrafeilinfo } = props.dokumentmetadata;
    const tittel = props.journalpostmetadata.resultat.hoveddokument?.tittel ?? 'Kunne ikke finne tittel';
    const openPdfUrl = `/saksoversikt-api/tjenester/dokumenter/dokument/${props.journalpostmetadata.resultat.journalpostId}/${props.dokref}`;
    const printUrl = `/saksoversikt/app/print/${props.journalpostmetadata.resultat.journalpostId}/${props.dokref}`;

    useScrollToTop();
    const onLastNedClick = (e: React.MouseEvent) => {
        props.lastNedPdfOnClick && props.lastNedPdfOnClick(openPdfUrl, e);
    };

    const onPrintClick = (e: React.MouseEvent) => {
        props.printPdfOnClick && props.printPdfOnClick(printUrl, e);
    };

    const pdfLink = (
        <Lenke target="_blank" href={openPdfUrl} onClick={onLastNedClick}>
            Last ned som PDF
        </Lenke>
    );
    const skrivUtLink = (
        <Lenke target="_blank" href={printUrl} onClick={onPrintClick}>
            Last ned og skriv ut
        </Lenke>
    );
    const linker =
        kanVises || ekstrafeilinfo.korruptPdf === 'true' ? (
            <div className="lokal-linker">
                {pdfLink}
                {skrivUtLink}
            </div>
        ) : (
            <noscript />
        );

    const maybeDokumentTittel = lagDokumentTittel(kanVises, ekstrafeilinfo, tittel);
    const bilder = bildeurler.map((bildeUrl, index) => (
        <DokumentSide
            url={bildeUrl}
            kanVises={kanVises}
            tittel={tittel}
            side={index + 1}
            feilmelding={feilmelding}
            key={bildeUrl}
            ekstrafeilinfo={ekstrafeilinfo}
            openPdfUrl={openPdfUrl}
        />
    ));

    return (
        <li id={props.dokref} className="dokument">
            <DokumentHeader tabbable={!!maybeDokumentTittel} scrollToTopOnFocus={props.first}>
                {maybeDokumentTittel}
                {linker}
            </DokumentHeader>
            {bilder}
        </li>
    );
}

export default Dokument;
