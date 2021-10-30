import * as React from 'react';
import {JournalpostMetadata} from "./domain";

interface Props {
    journalpostMetadata: JournalpostMetadata;
}

function AvsenderMottaker(props: Props) {
    const { navn, retning, avsender, mottaker } = props.journalpostMetadata;
    if (retning === 'INN' && avsender === 'SLUTTBRUKER') {
        return <span>Mottatt fra deg</span>;
    } else if (retning === 'UT' && mottaker === 'SLUTTBRUKER') {
        return <span>Sendt fra NAV til deg</span>;
    } else if (retning === 'UT' && mottaker === 'EKSTERN_PART') {
        return <span>Sendt fra NAV til {navn}</span>;
    } else if (retning === 'INN' && avsender === 'EKSTERN_PART') {
        return <span>Sendt fra {navn} til NAV</span>;
    } else if (retning === 'INTERN') {
        return <span>Samtalereferat</span>;
    }
    return null;
}

export default AvsenderMottaker