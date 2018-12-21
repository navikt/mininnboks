import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

function AvsenderMottaker({ retning, avsender, mottaker, navn }) {
    if (retning === 'INN' && avsender === 'SLUTTBRUKER') {
        return <FormattedMessage id={'dokumentvisning.mottatt.fra.bruker'}/>;
    } else if (retning === 'UT' && mottaker === 'SLUTTBRUKER') {
        return <FormattedMessage id={'dokumentvisning.mottatt.sendt.til.bruker'}/>;
    } else if (retning === 'UT' && mottaker === 'EKSTERN_PART') {
        return <FormattedMessage id={'dokumentvisning.mottatt.sendt.til.eksternpart'} values={{ eksternpart: navn }}/>;
    } else if (retning === 'INN' && avsender === 'EKSTERN_PART') {
        return <FormattedMessage id={'dokumentvisning.mottatt.sendt.fra.eksternpart'} values={{ eksternpart: navn }}/>;
    } else if (retning === 'INTERN') {
        return <FormattedMessage id="dokumentvisning.mottatt.samtalereferat"/>;
    }
    return null;
}

AvsenderMottaker.propTypes = {
    retning: PropTypes.string.isRequired,
    navn: PropTypes.string,
    avsender: PropTypes.string.isRequired,
    mottaker: PropTypes.string.isRequired
};

export default AvsenderMottaker;
