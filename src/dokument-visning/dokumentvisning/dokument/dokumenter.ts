import PropTypes from 'prop-types';
import React from 'react';
import Dokument from './dokument';

const Dokumenter = ({ dokumentmetadata, journalpostId, lastNedPdfOnClick, printPdfOnClick }) => {
    const vedleggListe = dokumentmetadata.map((vedlegg, index) =>
        <Dokument
          journalpostId={journalpostId}
          dokumentmetadata={vedlegg}
          dokref={vedlegg.dokumentreferanse}
          key={vedlegg.dokumentreferanse}
          lastNedPdfOnClick={lastNedPdfOnClick}
          printPdfOnClick={printPdfOnClick}
          first={index === 0}
        />
    );

    return (
        <ul className="dokumentliste">
            {vedleggListe}
        </ul>
    );
};

Dokumenter.propTypes = {
    journalpostId: PropTypes.string.isRequired,
    dokumentmetadata: PropTypes.array.isRequired,
    lastNedPdfOnClick: PropTypes.func,
    printPdfOnClick: PropTypes.func
};

export default Dokumenter;
