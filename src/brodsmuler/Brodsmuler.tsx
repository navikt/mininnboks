import * as React from 'react';
import Brodsmule from './Brodsmule';
import {Route, Switch} from 'react-router-dom';
import {FormattedMessage} from 'react-intl'
import {useDispatch} from 'react-redux';
import raw from 'raw.macro';


import './brodsmuler.less'
import {selectTraaderMedSammenslatteMeldinger} from "../ducks/traader";

import {useParams} from "react-router";
import {useAppState} from "../utils/custom-hooks";

const personSvg = raw('./person.svg');


const typeMap = {
    "dokument": "Dokumentvisning",
    "oppgave": "Oppgavevisning",
};

function TypeSmule() {
    const params = useParams<{ type: string }>();
    return <>{typeMap[params.type]}</>
}

function TraadSmule() {
    const params = useParams<{ traadId: string }>();
    const traadId = params.traadId;
    const state = useAppState(state => state);
    const dispatch = useDispatch();
    const traader = dispatch(selectTraaderMedSammenslatteMeldinger(state))
    const valgttraad = traader.data.find(traad => traad.traadId === traadId);

    if (!valgttraad) {
        return null;
    }
    const nyeste = valgttraad.nyeste;
    return (
        <FormattedMessage
            id="traadvisning.overskrift"
            values={{
                kassert: nyeste.kassert,
                temagruppeNavn: nyeste.temagruppeNavn
            }}
        />
    );
}

function NyMeldingSmule() {
    return <>Ny melding</>
}

function Brodsmuler() {
    return (
        <div className="brodsmuler">
            <img
                src={personSvg}
                alt="person-illustrasjon"
                className="brodsmuler__illustrasjon"
            />
            <ol className="brodsmuler__list">
                <FormattedMessage id="brodsmulesti.dittnav.lenketekst">
                    {(tekst : string) => (
                        <FormattedMessage id="dittnav.url">
                            {(url: string) => <Brodsmule tekst={tekst} path={url}/>}
                        </FormattedMessage>
                    )}
                </FormattedMessage>

                <Brodsmule
                    tekst="Min innboks"
                    path="/"
                />

                <span className="brodsmuler__item typo-normal">
                    <Switch>
                        <Route path="/sporsmal/skriv/:temagruppe/direkte" component={NyMeldingSmule}/>
                        <Route path="/sporsmal/skriv/:temagruppe/" component={NyMeldingSmule}/>
                        <Route path="/traad/:traadId" component={TraadSmule}/>
                        <Route path="/:type" component={TypeSmule}/>
                    </Switch>
                </span>
            </ol>
        </div>
    );
}

export default Brodsmuler;
