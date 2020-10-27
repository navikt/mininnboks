import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useParams } from 'react-router';
import Brodsmule from './Brodsmule';
import { selectTraaderMedSammenslatteMeldinger } from '../ducks/traader';
import { useAppState } from '../utils/custom-hooks';
import personSvg from './person.svg';
import './brodsmuler.less';

const typeMap: { [key: string]: string } = {
    dokument: 'Dokumentvisning',
    oppgave: 'Oppgavevisning'
};

function TypeSmule() {
    const params = useParams<{ type: string }>();
    return <>{typeMap[params.type]}</>;
}

function TraadSmule() {
    const params = useParams<{ traadId: string }>();
    const traader = useAppState(selectTraaderMedSammenslatteMeldinger);
    const valgttraad = traader.data.find((traad) => traad.traadId === params.traadId);

    if (!valgttraad) {
        return null;
    }
    const nyeste = valgttraad.nyeste;
    const melding = nyeste.kassert ? 'Kassert dialog' : `Dialog om ${nyeste.temagruppeNavn}`;
    return <>{melding}</>;
}

function NyMeldingSmule() {
    return <>Ny melding</>;
}

function Brodsmuler() {
    return (
        <div className="brodsmuler">
            <img src={personSvg} alt="person-illustrasjon" className="brodsmuler__illustrasjon" />
            <ol className="brodsmuler__list">
                <Brodsmule tekst="Ditt NAV" path="https://tjenester.nav.no/dittnav" />
                <Brodsmule tekst="Min innboks" path="/" />
                <span className="brodsmuler__item typo-normal">
                    <Switch>
                        <Route path="/sporsmal/skriv/:temagruppe/direkte" component={NyMeldingSmule} />
                        <Route path="/sporsmal/skriv/:temagruppe/" component={NyMeldingSmule} />
                        <Route path="/traad/:traadId" component={TraadSmule} />
                        <Route path="/:type" component={TypeSmule} />
                    </Switch>
                </span>
            </ol>
        </div>
    );
}

export default Brodsmuler;
