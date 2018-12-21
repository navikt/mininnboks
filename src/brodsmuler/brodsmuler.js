import React from 'react';

import PT from 'prop-types';
import personSvg from './person.svg';
import Brodsmule from './brodsmule';
import {Route, Switch, withRouter} from 'react-router-dom';
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux';

import './brodsmuler.less'
import {selectTraaderMedSammenslatteMeldinger} from "../ducks/traader";

const typeMap = {
    "dokument": "Dokumentvisning",
    "oppgave": "Oppgavevisning",
};

function TypeSmule({match}) {
    const params = match.params;
    return <React.Fragment>{typeMap[params.type]}</React.Fragment>
}

function TraadSmule({match, traader}) {
    const params = match.params;
    const traadId = params.traadId;
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

const mapStateToProps = (state) => ({
    traader: selectTraaderMedSammenslatteMeldinger(state),
});

TraadSmule = withRouter(connect(mapStateToProps)(TraadSmule));

function NyMeldingSmule() {
    return <React.Fragment>Ny melding</React.Fragment>
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
                    {(tekst) => (
                        <FormattedMessage id="dittnav.url">
                            {(url) => <Brodsmule tekst={tekst} path={url}/>}
                        </FormattedMessage>
                    )}
                </FormattedMessage>

                <Brodsmule
                    tekst="Min innboks"
                    path="/"
                />

                <span className="brodsmuler__item typo-normal">
                    <Switch>
                        <Route path="/sporsmal/skriv/:temagruppe" component={NyMeldingSmule}/>
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

Brodsmuler.propTypes = {
    underOppfolging: PT.bool,
};

Brodsmuler.defaultProps = {
    underOppfolging: undefined,
};

export default Brodsmuler;
