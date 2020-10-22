import * as React from 'react';
import { FormattedDate } from 'react-intl';
import AvsenderMottaker from './AvsenderMottaker';
import {Undertittel } from 'nav-frontend-typografi';
import { Journalpostmetadata } from 'dokument';
import moment from 'moment';


interface Props {
    hode: boolean,
    journalpostmetadata: Journalpostmetadata
    className : string
}

const UKJENT_JOURNALPOSTID = 'x';
const toDate = (dato : string) => {
    return moment(dato).toDate();
};

const erGyldigJournalpost = (journalPostId : string) => {
    return journalPostId && journalPostId !== UKJENT_JOURNALPOSTID;
};

function Personalia(props : Props) {
    if (!erGyldigJournalpost(props.journalpostmetadata.journalPostId)) {
        return null;
    }
    return (
        <section className={props.className}>
            <Undertittel tag="h1">
                <AvsenderMottaker
                    retning={props.journalpostmetadata.retning}
                    mottaker={props.journalpostmetadata.mottaker}
                    avsender={props.journalpostmetadata.avsender}
                    navn={props.journalpostmetadata.navn}
                />
            </Undertittel>
            <p className="typo-undertittel text-center">
                <FormattedDate
                    value={toDate(props.journalpostmetadata.dato)}
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

export default Personalia;
