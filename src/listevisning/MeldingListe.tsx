import * as React from "react";
import MeldingPreview from "./MeldingPreview";
import DokumentPreview from "./DokumentPreview";
import OppgavePreview from "./OppgavePreview";
import { FormattedMessage } from "react-intl";
import { Panel } from "nav-frontend-paneler";
import { Undertittel } from "nav-frontend-typografi";
import { Traad } from "../Traad";

interface MeldingsListeElement {
  data: Traad;
  aktiv: boolean;
  ulestMeldingKlasse?: string;
}
interface Props {
  meldinger: MeldingsListeElement[];
  overskrift: string;
}

const previewMap: { [key: string]: React.ComponentType<any> } = {
  DOKUMENT_VARSEL: DokumentPreview,
  OPPGAVE_VARSEL: OppgavePreview,
  defaultVisning: MeldingPreview,
};

function MeldingListe(props: Props) {
  const innhold = props.meldinger.map((melding: MeldingsListeElement) => {
    const type = melding.data.nyeste.type;
    const props = {
      aktiv: melding.aktiv,
      key: melding.data.traadId,
      traad: melding.data,
      ulestMeldingKlasse: melding.ulestMeldingKlasse,
    };

    const previewComponent = previewMap[type] || previewMap.defaultVisning;
    return React.createElement(previewComponent, props);
  });

  return (
    <section className="traad-liste">
      <Panel className="blokk-xxxs">
        <Undertittel tag="h2">
          <FormattedMessage
            id={props.overskrift}
            values={{ antallMeldinger: props.meldinger.length }}
          />
          <span className="vekk">({props.meldinger.length})</span>
        </Undertittel>
      </Panel>
      <ul className="ustilet">{innhold}</ul>
    </section>
  );
}

export default MeldingListe;
