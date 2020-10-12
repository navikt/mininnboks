import * as React from 'react';
import personSvg from './person.svg';
import Brodsmule from './Brodsmule';
import {Route, Switch, withRouter} from 'react-router-dom';
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux';

import './brodsmuler.less'
import {selectTraaderMedSammenslatteMeldinger} from "../ducks/traader";
import {Traad} from "../Traad";
import {AppState} from "../reducer";
import {useParams} from "react-router";

interface Props {
    traader: Traad[],
    underOppfolging: boolean
}

const typeMap = {
    "dokument": "Dokumentvisning",
    "oppgave": "Oppgavevisning",
};

function TypeSmule() {
    const params = useParams<{ type: string }>();
    return <>{typeMap[params.type]}</>
}

function TraadSmule(props : Props) {
    const params = useParams<{ traadId: string }>();
    const traadId = params.traadId;
    const valgttraad = props.traader.find(traad => traad.traadId === traadId);
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

const mapStateToProps = (state : AppState) => ({
    traader: selectTraaderMedSammenslatteMeldinger(state),
});

TraadSmule = withRouter(connect(mapStateToProps)(TraadSmule));

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

Brodsmuler.defaultProps = {
    underOppfolging: false,
};

Brodsmuler.defaultProps = {
    underOppfolging: undefined,
};

export default Brodsmuler;
