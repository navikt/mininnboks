import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
    retning: string;
    navn: string;
    avsender: string;
    mottaker: string;
}

function AvsenderMottaker(props: Props) {
    if (props.retning === 'INN' && props.avsender === 'SLUTTBRUKER') {
        return <FormattedMessage id={'dokumentvisning.mottatt.fra.bruker'} />;
    } else if (props.retning === 'UT' && props.mottaker === 'SLUTTBRUKER') {
        return <FormattedMessage id={'dokumentvisning.mottatt.sendt.til.bruker'} />;
    } else if (props.retning === 'UT' && props.mottaker === 'EKSTERN_PART') {
        return (
            <FormattedMessage
                id={'dokumentvisning.mottatt.sendt.til.eksternpart'}
                values={{ eksternpart: props.navn }}
            />
        );
    } else if (props.retning === 'INN' && props.avsender === 'EKSTERN_PART') {
        return (
            <FormattedMessage
                id={'dokumentvisning.mottatt.sendt.fra.eksternpart'}
                values={{ eksternpart: props.navn }}
            />
        );
    } else if (props.retning === 'INTERN') {
        return <FormattedMessage id="dokumentvisning.mottatt.samtalereferat" />;
    }
    return null;
}

export default AvsenderMottaker;
