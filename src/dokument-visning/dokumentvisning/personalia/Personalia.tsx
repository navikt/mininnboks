import * as React from 'react';
import AvsenderMottaker from './AvsenderMottaker';
import { Undertittel } from 'nav-frontend-typografi';
import { Journalpostmetadata } from '../../../dokument';
import { formaterDato } from '../../../utils/date-utils';

interface Props {
    hode: boolean;
    journalpostmetadata: Journalpostmetadata;
    className: string;
}

const UKJENT_JOURNALPOSTID = 'x';

const erGyldigJournalpost = (journalPostId: string) => {
    return journalPostId && journalPostId !== UKJENT_JOURNALPOSTID;
};

function Personalia(props: Props) {
    if (!erGyldigJournalpost(props.journalpostmetadata.journalpostId)) {
        return null;
    }
    const dato = formaterDato(props.journalpostmetadata.dato);

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
            <p className="typo-undertittel text-center">{dato}</p>
        </section>
    );
}

Personalia.defaultProps = {
    hode: true
};

export default Personalia;
