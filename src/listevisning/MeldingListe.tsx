import * as React from 'react';
import MeldingPreview from './MeldingPreview';
import DokumentPreview from './DokumentPreview';
import OppgavePreview from './oppgave-preview';
import { FormattedMessage } from 'react-intl';
import { Panel } from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi'
import {Melding} from "../Traad";

interface Props {
    meldinger: Array<Melding>,
    overskrift: string
}

const previewMap = {
    DOKUMENT_VARSEL: DokumentPreview,
    OPPGAVE_VARSEL: OppgavePreview,
    defaultVisning: MeldingPreview
};

function MeldingListe(props : Props) {
    const innhold = props.meldinger.map((config : any) => {
        const type = config.traad.nyeste.type;
        const props = {
            aktiv: config.aktiv,
            key: config.traad.traadId,
            traad: config.traad,
            ulestMeldingKlasse: config.ulestMeldingKlasse
        };

        const previewComponent = previewMap[type] || previewMap.defaultVisning;
        return React.createElement(previewComponent, props);
    });

    return (
        <section className="traad-liste">
            <Panel className="blokk-xxxs" >
                <Undertittel tag="h2">
                    <FormattedMessage id={props.overskrift} values={{ antallMeldinger: props.meldinger.length }} />
                    <span className="vekk">({props.meldinger.length})</span>
                </Undertittel>
            </Panel>
            <ul className="ustilet">
                {innhold}
            </ul>
        </section>
    );
};

export default MeldingListe;
