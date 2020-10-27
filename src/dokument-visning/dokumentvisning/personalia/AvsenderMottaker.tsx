import * as React from 'react';

interface Props {
    retning: string;
    navn: string;
    avsender: string;
    mottaker: string;
}

function AvsenderMottaker(props: Props) {
    if (props.retning === 'INN' && props.avsender === 'SLUTTBRUKER') {
        return <span>Mottatt fra deg</span>;
    } else if (props.retning === 'UT' && props.mottaker === 'SLUTTBRUKER') {
        return <span>Sendt fra NAV til deg</span>;
    } else if (props.retning === 'UT' && props.mottaker === 'EKSTERN_PART') {
        return <span>Sendt fra NAV til {props.navn}</span>;
    } else if (props.retning === 'INN' && props.avsender === 'EKSTERN_PART') {
        return <span>Sendt fra {props.navn} til NAV</span>;
    } else if (props.retning === 'INTERN') {
        return <span>Samtalereferat</span>;
    }
    return null;
}

export default AvsenderMottaker;
