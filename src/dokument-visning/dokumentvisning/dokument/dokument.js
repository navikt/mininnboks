import PropTypes from 'prop-types';
import React from 'react';
import DokumentSide from './dokument-side';
// import { Element } from 'react-scroll';
import { FormattedMessage } from 'react-intl';
import DokumentHeader from './dokument-header';
import Lenke from 'nav-frontend-lenker';

const lagDokumentTittel = (kanVises, ekstrafeilinfo, tittel) => {
    if (kanVises) {
        return <h1 className="typo-element">{tittel}</h1>;
    } else if (ekstrafeilinfo.korruptPdf === 'true') {
        return <h1 className="typo-element">{ekstrafeilinfo.tittel}</h1>;
    }
    return null;
};

const Dokument = ({ dokref, journalpostId, dokumentmetadata, first, lastNedPdfOnClick, printPdfOnClick }) => {
    const { bildeurler, kanVises, tittel, feilmelding, ekstrafeilinfo } = dokumentmetadata;
    const openPdfUrl = `/saksoversikt-api/tjenester/dokumenter/dokument/${journalpostId}/${dokref}`;
    const printUrl = `/saksoversikt/app/print/${journalpostId}/${dokref}`;

    const onLastNedClick = !lastNedPdfOnClick ? null : lastNedPdfOnClick.bind(this, openPdfUrl);
    const onPrintClick = !printPdfOnClick ? null : printPdfOnClick.bind(this, printUrl);

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
        <li id={dokref} className="dokument">
            <DokumentHeader tabbable={!!maybeDokumentTittel} scrollToTopOnFocus={first}>
                {maybeDokumentTittel}
                {linker}
            </DokumentHeader>
            {bilder}
        </li>
    );
};

Dokument.propTypes = {
    dokref: PropTypes.string.isRequired,
    first: PropTypes.bool.isRequired,
    journalpostId: PropTypes.string.isRequired,
    lastNedPdfOnClick: PropTypes.func,
    printPdfOnClick: PropTypes.func,
    dokumentmetadata: PropTypes.shape({
        bildeurler: PropTypes.array.isRequired,
        kanVises: PropTypes.bool.isRequired,
        tittel: PropTypes.string,
        ekstrafeilinfo: PropTypes.object,
        feilmelding: PropTypes.string
    }).isRequired
};

export default Dokument;
