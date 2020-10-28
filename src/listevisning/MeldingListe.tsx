import * as React from 'react';
import MeldingPreview from './MeldingPreview';
import DokumentPreview from './DokumentPreview';
import OppgavePreview from './OppgavePreview';
import { Panel } from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import { Traad } from '../Traad';

interface MeldingsListeElement {
    data: Traad;
    aktiv: boolean;
    ulestMeldingKlasse?: string;
}
interface Props {
    meldinger: MeldingsListeElement[];
    uleste: boolean;
}

const previewMap: { [key: string]: React.ComponentType<any> } = {
    DOKUMENT_VARSEL: DokumentPreview,
    OPPGAVE_VARSEL: OppgavePreview,
    defaultVisning: MeldingPreview
};

function MeldingListe(props: Props) {
    const innhold = props.meldinger.map((melding: MeldingsListeElement) => {
        const type = melding.data.nyeste.type;
        const props = {
            aktiv: melding.aktiv,
            key: melding.data.traadId,
            traad: melding.data,
            ulestMeldingKlasse: melding.ulestMeldingKlasse
        };

        const previewComponent = previewMap[type] || previewMap.defaultVisning;
        return React.createElement(previewComponent, props);
    });
    const antallMeldinger = props.meldinger.length;
    const overskrift = props.uleste
        ? antallMeldinger === 0
            ? 'Du har ingen uleste meldinger'
            : 'Uleste meldinger'
        : antallMeldinger === 0
        ? 'Du har ingen leste meldinger'
        : 'Leste meldinger';

    return (
        <section className="traad-liste">
            <Panel className="blokk-xxxs">
                <Undertittel tag="h2">
                    {overskrift}
                    <span className="vekk">({props.meldinger.length})</span>
                </Undertittel>
            </Panel>
            <ul className="ustilet">{innhold}</ul>
        </section>
    );
}

export default MeldingListe;
