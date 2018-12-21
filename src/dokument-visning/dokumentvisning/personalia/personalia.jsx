import React from 'react';
import PT from 'prop-types';
import { FormattedDate } from 'react-intl';
import AvsenderMottaker from './avsender-mottaker';
import {Undertittel } from 'nav-frontend-typografi';
import moment from 'moment';

const UKJENT_JOURNALPOSTID = 'x';
const toDate = (dato) => {
    return moment(dato).toDate();
};

const erGyldigJournalpost = (metadata) => {
    return metadata && metadata.journalpostId && metadata.journalpostId !== UKJENT_JOURNALPOSTID;
};

function Personalia({ journalpostmetadata, className, hode }) {
    const { dato, retning, mottaker, avsender, navn } = journalpostmetadata;
    if (!erGyldigJournalpost(journalpostmetadata)) {
        return null;
    }
    return (
        <section className={className}>
            <Undertittel tag="h1">
                <AvsenderMottaker retning={retning} mottaker={mottaker} avsender={avsender} navn={navn}/>
            </Undertittel>
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
        dato: PT.string.isRequired
    }).isRequired
};

export default Personalia;
