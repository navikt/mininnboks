import React from 'react';
import PT from 'prop-types';
import { FormattedDate } from 'react-intl';
import classNames from 'classnames';
import AvsenderMottaker from './avsender-mottaker';

const UKJENT_JOURNALPOSTID = 'x';
const toDate = (dato) => {
    return dato && new Date(dato.year, dato.monthValue - 1, dato.dayOfMonth, dato.hour, dato.minute, dato.second);
};

const h1Klasse = (hode) => classNames('text-center nettobunn', {
    'hode': hode,
    'hode-undertittel': hode
});

const erGyldigJournalpost = (metadata) => {
    return metadata && metadata.journalpostId && metadata.journalpostId !== UKJENT_JOURNALPOSTID;
};

function Personalia({ journalpostmetadata, hode }) {
    const { dato, retning, mottaker, avsender, navn } = journalpostmetadata;
    if (!erGyldigJournalpost(journalpostmetadata)) {
        return null;
    }
    return (
        <section className="personalia">
            <h1 className={h1Klasse(hode)}>
                <AvsenderMottaker retning={retning} mottaker={mottaker} avsender={avsender} navn={navn}/>
            </h1>
            <p className="typo-undertittel text-center">
                <FormattedDate
                    value={toDate(dato)}
                    day="numeric"
                    month="long"
                    year="numeric"
                />
            </p>
        </section>
    );
}

Personalia.defaultProps = {
    hode: true
};

Personalia.propTypes = {
    hode: PT.bool,
    journalpostmetadata: PT.shape({
        retning: PT.string.isRequired,
        navn: PT.string,
        avsender: PT.string.isRequired,
        mottaker: PT.string.isRequired,
        dato: PT.shape({
            monthValue: PT.number.isRequired,
            dayOfMonth: PT.number.isRequired,
            year: PT.number.isRequired,
            hour: PT.number.isRequired,
            minute: PT.number.isRequired,
            second: PT.number.isRequired
        }).isRequired
    }).isRequired
};

export default Personalia;
