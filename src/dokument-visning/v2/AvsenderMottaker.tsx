import * as React from 'react';
import { Journalpost, Retning, AvsenderMottaker as Part } from './domain';

interface Props {
    journalpost: Journalpost;
}

function AvsenderMottaker(props: Props) {
    const { retning, avsender, mottaker } = props.journalpost;
    if (retning === Retning.INN && avsender === Part.SLUTTBRUKER) {
        return <span>Mottatt fra deg</span>;
    } else if (retning === Retning.UT && mottaker === Part.SLUTTBRUKER) {
        return <span>Sendt fra NAV til deg</span>;
    } else if (retning === Retning.UT && mottaker === Part.EKSTERN_PART) {
        return <span>Sendt fra NAV til deg</span>;
    } else if (retning === Retning.INN && avsender === Part.EKSTERN_PART) {
        return <span>Sendt fra deg til NAV</span>;
    } else if (retning === Retning.INTERN) {
        return <span>Samtalereferat</span>;
    }
    return null;
}

export default AvsenderMottaker;
