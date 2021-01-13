import * as React from 'react';
import AvsenderMottaker from './AvsenderMottaker';
import { Undertittel } from 'nav-frontend-typografi';
import { JournalpostMetadata } from '../../../dokument';
import { formaterDato } from '../../../utils/date-utils';

interface Props {
    journalpostmetadata: JournalpostMetadata;
    className: string;
}

const UKJENT_JOURNALPOSTID = 'x';

const erGyldigJournalpost = (journalPostId: string) => {
    return journalPostId && journalPostId !== UKJENT_JOURNALPOSTID;
};

function Personalia(props: Props) {
    if (!erGyldigJournalpost(props.journalpostmetadata.resultat.journalpostId)) {
        return null;
    }
    const dato = formaterDato(props.journalpostmetadata.resultat.dato);

    return (
        <section className={props.className}>
            <Undertittel tag="h1">
                <AvsenderMottaker
                    retning={props.journalpostmetadata.resultat.retning}
                    mottaker={props.journalpostmetadata.resultat.mottaker}
                    avsender={props.journalpostmetadata.resultat.avsender}
                    navn={props.journalpostmetadata.resultat.navn}
                />
            </Undertittel>
            <p className="typo-undertittel text-center">{dato}</p>
        </section>
    );
}

export default Personalia;
