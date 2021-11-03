import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import AvsenderMottaker from './AvsenderMottaker';
import { Journalpost } from './domain';
import { formaterDato } from '../../utils/date-utils';

interface Props {
    journalpost: Journalpost;
}

function JournalpostInfo(props: Props) {
    return (
        <section className="blokk-m">
            <Undertittel tag="h1">
                <AvsenderMottaker journalpost={props.journalpost} />
            </Undertittel>
            <p className="typo-undertittel text-center">{formaterDato(props.journalpost.dato)}</p>
        </section>
    );
}

export default JournalpostInfo;
