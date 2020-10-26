import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { useParams } from "react-router";
import Brodsmule from "./Brodsmule";
import { selectTraaderMedSammenslatteMeldinger } from "../ducks/traader";
import { useAppState } from "../utils/custom-hooks";
import personSvg from "./person.svg";
import "./brodsmuler.less";

const typeMap: { [key: string]: string } = {
  dokument: "Dokumentvisning",
  oppgave: "Oppgavevisning",
};

function TypeSmule() {
  const params = useParams<{ type: string }>();
  return <>{typeMap[params.type]}</>;
}

function TraadSmule() {
  const params = useParams<{ traadId: string }>();
  const traader = useAppState(selectTraaderMedSammenslatteMeldinger);
  const valgttraad = traader.data.find(
    (traad) => traad.traadId === params.traadId
  );

  if (!valgttraad) {
    return null;
  }
  const nyeste = valgttraad.nyeste;
  return (
    <FormattedMessage
      id="traadvisning.overskrift"
      values={{
        kassert: nyeste.kassert,
        temagruppeNavn: nyeste.temagruppeNavn,
      }}
    />
  );
}

function NyMeldingSmule() {
  return <>Ny melding</>;
}

function Brodsmuler() {
  const intl = useIntl();
  const dittnavTekst = intl.formatMessage({
    id: "brodsmulesti.dittnav.lenketekst",
  });
  const dittnavUrl = intl.formatMessage({ id: "dittnav.url" });
  return (
    <div className="brodsmuler">
      <img
        src={personSvg}
        alt="person-illustrasjon"
        className="brodsmuler__illustrasjon"
      />
      <ol className="brodsmuler__list">
        <Brodsmule tekst={dittnavTekst} path={dittnavUrl} />
        <Brodsmule tekst="Min innboks" path="/" />
        <span className="brodsmuler__item typo-normal">
          <Switch>
            <Route
              path="/sporsmal/skriv/:temagruppe/direkte"
              component={NyMeldingSmule}
            />
            <Route
              path="/sporsmal/skriv/:temagruppe/"
              component={NyMeldingSmule}
            />
            <Route path="/traad/:traadId" component={TraadSmule} />
            <Route path="/:type" component={TypeSmule} />
          </Switch>
        </span>
      </ol>
    </div>
  );
}

export default Brodsmuler;
