import * as React from 'react';
import DokumentSide from './DokumentSide';
// import { Element } from 'react-scroll';
import { FormattedMessage } from 'react-intl';
import DokumentHeader from './DokumentHeader';
import Lenke from 'nav-frontend-lenker';
import {DokumentMetadata, Ekstrafeilinfo} from "../../../dokument";

const lagDokumentTittel = (kanVises : boolean, ekstrafeilinfo : Ekstrafeilinfo, tittel : string) => {
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
    journalpostId: string;
    lastNedPdfOnClick: (url : string, event : Event) => void
    printPdfOnClick: (url : string, event : Event) => void;
    dokumentmetadata: DokumentMetadata;
}

function Dokument (props: Props){
    const { bildeurler, kanVises, tittel, feilmelding, ekstrafeilinfo } = props.dokumentmetadata;
    const openPdfUrl = `/saksoversikt-api/tjenester/dokumenter/dokument/${props.journalpostId}/${props.dokref}`;
    const printUrl = `/saksoversikt/app/print/${props.journalpostId}/${props.dokref}`;

    const onLastNedClick = !props.lastNedPdfOnClick ? null : props.lastNedPdfOnClick.bind(props.lastNedPdfOnClick, openPdfUrl);
    const onPrintClick = !props.printPdfOnClick ? null : props.printPdfOnClick.bind(props.printPdfOnClick, printUrl);

    const pdfLink = (
        <Lenke target="_blank" href={openPdfUrl} onClick={onLastNedClick}>
            <FormattedMessage id={'dokumentvisning.openpdf'} />
        </Lenke>
    );
    const skrivUtLink = (
        <Lenke target="_blank" href={printUrl} onClick={onPrintClick}>
            <FormattedMessage id={'dokumentvisning.skrivut'} />
        </Lenke>
    );
    const linker = kanVises || ekstrafeilinfo.korruptPdf === 'true' ? <div className="lokal-linker">{pdfLink}{skrivUtLink}</div> : <noscript />;

    const maybeDokumentTittel = lagDokumentTittel(kanVises, ekstrafeilinfo, tittel);
    const bilder = bildeurler.map((bildeUrl, index) =>
        <DokumentSide
          url={bildeUrl}
          kanVises={kanVises}
          tittel={tittel}
          side={index + 1}
          feilmelding={feilmelding}
          key={bildeUrl}
          ekstrafeilinfo={ekstrafeilinfo}
          openPdfUrl={openPdfUrl}
        />);

    return (
        <li id={props.dokref} className="dokument">
            <DokumentHeader tabbable={!!maybeDokumentTittel} scrollToTopOnFocus={props.first}>
                {maybeDokumentTittel}
                {linker}
            </DokumentHeader>
            {bilder}
        </li>
    );
};

export default Dokument;
