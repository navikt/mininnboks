import * as React from 'react';
import {Undertittel} from "nav-frontend-typografi";
import AvsenderMottaker from "./AvsenderMottaker";
import {JournalpostMetadata} from "./domain";
import {formaterDato} from "../../utils/date-utils";

interface Props {
    journalpostmetadata: JournalpostMetadata;
}

function JournalpostInfo(props: Props) {
    return (
        <section className="blokk-m">
            <Undertittel tag="h1">
                <AvsenderMottaker journalpostMetadata={props.journalpostmetadata}/>
            </Undertittel>
            <p className="typo-undertittel text-center">
                {formaterDato(props.journalpostmetadata.dato)}
            </p>
        </section>
    );
}

export default JournalpostInfo