import PT from 'prop-types';
import React from 'react';
import BesvarBoks from './besvar-boks';
import Feilmelding from './../feilmelding/feilmelding';
import MeldingContainer from './melding-container';
import SkrivKnapp from './skriv-knapp';
import { STATUS } from './../ducks/utils';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { markerTraadSomLest, sendSvar, selectTraaderMedSammenslatteMeldinger } from './../ducks/traader';
import { visBesvarBoks, skjulBesvarBoks } from './../ducks/ui';
import { connect } from 'react-redux';
import { storeShape, traadShape } from './../proptype-shapes';
import { Sidetittel } from 'nav-frontend-typografi'
import { withRouter } from 'react-router-dom';
import Alertstripe from 'nav-frontend-alertstriper'


import './traadvisning.less';
import {visibleIfHOC} from "../utils/hocs/visible-if";

const AlertstripeVisibleIf = visibleIfHOC(Alertstripe);

const resolver = (temagruppe) => (key, tekst) => {
    if (key === ':tema') {
        return `Dialog om ${temagruppe}`;
    }
    return tekst;
};

class TraadVisning extends React.Component {
    componentDidMount() {
        this.props.actions.markerSomLest(this.props.match.params.traadId);
    }

    render() {
        const {
            match, innsendingStatus, traader, skalViseBesvarBoks, actions
        } = this.props;

        const traadId = match.params.traadId;
        const valgttraad = traader.data.find(traad => traad.traadId === traadId);

        if (!valgttraad) {
            return (
                <Feilmelding>Fant ikke tråden du var ute etter</Feilmelding>
            );
        }

        const meldingItems = valgttraad.meldinger.map((melding) => (
            <MeldingContainer key={melding.id} melding={melding} />
        ));

        return (
            <div>

                <Sidetittel className="text-center blokk-l">
                    <FormattedMessage
                        id="traadvisning.overskrift"
                        values={{
                            kassert: valgttraad.nyeste.kassert,
                            temagruppeNavn: valgttraad.nyeste.temagruppeNavn
                        }}
                    />
                </Sidetittel>

                <div className="traad-container">
                    <AlertstripeVisibleIf
                        type="advarsel"
                        visibleIf={innsendingStatus && innsendingStatus === STATUS.ERROR}
                        className="blokk-m"
                    >
                        <FormattedMessage id='infoboks.advarsel' />
                    </AlertstripeVisibleIf>
                    <SkrivKnapp
                        visibleIf={valgttraad.kanBesvares && !skalViseBesvarBoks}
                        onClick={actions.visBesvarBoks}
                    />
                    <AlertstripeVisibleIf type="info" visibleIf={valgttraad.avsluttet}>
                        <FormattedMessage id="skriv.ny.link">{(lenke) => (
                            <FormattedHTMLMessage id="traadvisning.kan-ikke-svare" values={{ lenke }} />
                        )}</FormattedMessage>
                    </AlertstripeVisibleIf>
                    <BesvarBoks
                        innsendingStatus={innsendingStatus}
                        visibleIf={skalViseBesvarBoks}
                        traadId={traadId}
                        avbryt={actions.skjulBesvarBoks}
                        submit={actions.sendSvar}
                    />
                    {meldingItems}
                </div>
            </div>
        );
    }
}

TraadVisning.propTypes = {
    traader: storeShape(traadShape).isRequired,
    skalViseBesvarBoks: PT.bool.isRequired,
    innsendingStatus: PT.string.isRequired,
    actions: PT.shape({
        sendSvar: PT.func.isRequired,
        markerSomLest: PT.func.isRequired,
        visBesvarBoks: PT.func.isRequired,
        skjulBesvarBoks: PT.func.isRequired
    }).isRequired,
    params: PT.object.isRequired,
    routes: PT.array.isRequired
};

const mapStateToProps = (state) => ({
    traader: selectTraaderMedSammenslatteMeldinger(state),
    innsendingStatus: state.traader.innsendingStatus,
    skalViseBesvarBoks: state.ui.visBesvarBoks
});

const mapDispatchToProps = (dispatch) => ({
    actions: {
        markerSomLest: (traadId) => dispatch(markerTraadSomLest(traadId)),
        visBesvarBoks: () => dispatch(visBesvarBoks()),
        skjulBesvarBoks: () => dispatch(skjulBesvarBoks()),
        sendSvar: (traadId, fritekst) => dispatch(sendSvar(traadId, fritekst))
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TraadVisning));
