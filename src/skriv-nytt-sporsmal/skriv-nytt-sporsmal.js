import PT from 'prop-types';
import React from 'react';
import {bindActionCreators} from 'redux';
import {visVilkarModal, skjulVilkarModal} from './../ducks/ui';
import {sendSporsmal} from './../ducks/traader';
import {STATUS} from './../ducks/utils';
import {TextareaControlled} from 'nav-frontend-skjema';
import GodtaVilkar from './godta-vilkar';
import Kvittering from './kvittering';
import TemagruppeEkstraInfo from './temagruppe-ekstra-info';
import Feilmelding from '../feilmelding/feilmelding';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import Brodsmuler from '../brodsmuler/brodsmuler';
import {withRouter} from 'react-router-dom';
import {Sidetittel, Innholdstittel, Undertittel, Normaltekst} from 'nav-frontend-typografi'
import {Hovedknapp} from 'nav-frontend-knapper';
import Alertstripe from 'nav-frontend-alertstriper'

import './skriv-nytt-sporsmal.less';
import {validate} from "../utils/validationutil";
import {visibleIfHOC} from "../utils/hocs/visible-if";
import Spinner from "../utils/spinner";
import {harTilgangTilKommunaleTemagrupper} from "../ducks/tilgang";
import {sjekkOgOppdaterRatelimiter, sjekkRatelimiter} from "../utils/api";

const AlertstripeVisibleIf = visibleIfHOC(Alertstripe);

const ukjentTemagruppeTittel = <FormattedMessage id="skriv-sporsmal.ukjent-temagruppe"/>;

class SkrivNyttSporsmal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            rateLimiter: true,
        };
    }

    componentDidMount() {
        const temagruppe = this.props.match.params.temagruppe.toLowerCase();
        if (temagruppe === 'oksos') {
            this.props.actions.harTilgangTilKommunaleTemagrupper();
        }
        this.setState({
            kanSendeMelding: sjekkRatelimiter()
        })
    }

    render() {
        const {
            match,
            actions,
            sendingStatus,
            skalViseVilkarModal,
            godkjenteTemagrupper,
            tilgang
        } = this.props;

        const {
            errors,
            rateLimiter
        } = this.state;

        const params = match.params;
        const temagruppe = params.temagruppe;
        const isDirekte = match.path.includes('/direkte');

        if (temagruppe.toLowerCase() === 'oksos') {
            if (tilgang.status === STATUS.PENDING) {
                return <Spinner />;
            } else if (tilgang.status === STATUS.ERROR) {
                return (
                    <Alertstripe type="advarsel" >
                        <FormattedMessage id={`feilmelding.kommunalsjekk.fetchfeilet`}/>
                    </Alertstripe>
                );
            } else if (tilgang.status === STATUS.OK && tilgang.data.resultat !== 'OK') {
                return (
                    <Alertstripe type="info" >
                        <FormattedMessage id={`feilmelding.kommunalsjekk.${tilgang.data.resultat}`}/>
                    </Alertstripe>
                );
            }
        }



        const submit = (event) => {
            event.preventDefault();
            this.setState({
                kanSendeMelding: sjekkOgOppdaterRatelimiter()
            })

            if(sendingStatus === STATUS.PENDING) {
                return;
            }
            if(!rateLimiter){
                return (    <Alertstripe type="advarsel" >
                    <FormattedMessage id={`feilmelding.ratelimiter`}/>
                </Alertstripe>
                )
            }

            const elements = event.target.elements;
            const fritekst = elements.fritekst.value;
            const godkjennVilkaar = elements.godkjennVilkaar.checked;

            const errors = validate({
                fritekst,
                godkjennVilkaar
            });

            this.setState({
                errors: errors,
            });

            if (!Object.entries(errors).length) {
                actions.sendSporsmal(temagruppe, fritekst, isDirekte);
            }
        };


        if (!godkjenteTemagrupper.includes(temagruppe)) {
            return (
                <Feilmelding>{ukjentTemagruppeTittel}</Feilmelding>
            );
        } else if (sendingStatus === STATUS.OK) {
            return <Kvittering/>;
        }

        const fritekstError = errors.fritekst;
        const fritekstFeilmelding = fritekstError && (
            <Feilmelding className="blokk-m">
                <FormattedMessage id={`feilmelding.fritekst.${fritekstError}`}/>
            </Feilmelding>
        );
        const ratelimiterFeilmelding = !rateLimiter &&
            ( <Feilmelding>
                        <FormattedMessage id={`feilmelding.ratelimiter`}/>
            </Feilmelding>);

        return (
            <article className="blokk-center send-sporsmal-side skriv-nytt-sporsmal">
                <Brodsmuler/>
                <Sidetittel className="text-center blokk-m">
                    <FormattedMessage id="send-sporsmal.still-sporsmal.ny-melding-overskrift"/>
                </Sidetittel>
                {ratelimiterFeilmelding}
                <form className="panel text-center" onSubmit={submit}>
                    <i className="meldingikon"/>
                    <Innholdstittel className="blokk-xl">
                        <FormattedMessage id="send-sporsmal.still-sporsmal.deloverskrift"/>
                    </Innholdstittel>
                    <Undertittel className="blokk-s">
                        <FormattedMessage id={temagruppe}/>
                    </Undertittel>
                    <AlertstripeVisibleIf type="advarsel" visibleIf={sendingStatus && sendingStatus === STATUS.ERROR}>
                        <FormattedMessage id="infoboks.advarsel"/>
                    </AlertstripeVisibleIf>
                    <Normaltekst className="typo-normal blokk-xs">
                        <FormattedMessage id="textarea.infotekst"/>
                    </Normaltekst>
                    <TemagruppeEkstraInfo temagruppe={temagruppe} />
                    { fritekstFeilmelding }
                    <TextareaControlled
                        name="fritekst"
                        textareaClass="fritekst"
                        label={""}
                        maxLength={1000}
                    />
                    <GodtaVilkar
                        visModal={skalViseVilkarModal}
                        actions={actions}
                        inputName="godkjennVilkaar"
                        skalViseFeilmelding={!!errors.godkjennVilkaar}
                    />
                    <Hovedknapp type="submit" spinner={sendingStatus === STATUS.PENDING} aria-disabled={sendingStatus === STATUS.PENDING}>
                        <FormattedMessage id="send-sporsmal.still-sporsmal.send-inn"/>
                    </Hovedknapp>
                </form>
            </article>
        );
    }
}

SkrivNyttSporsmal.defaultProps = {
    godkjenteTemagrupper: ['ARBD']
};
SkrivNyttSporsmal.propTypes = {
    match: PT.object.isRequired,
    actions: PT.shape({
        sendSporsmal: PT.func,
        visVilkarModal: PT.func
    }).isRequired,
    sendingStatus: PT.string,
    skalViseVilkarModal: PT.bool.isRequired,
    godkjenteTemagrupper: PT.arrayOf(PT.string).isRequired,
    tilgang: PT.shape({
        status: PT.string.isRequired,
        data: PT.oneOfType([
            PT.shape({
                resultat: PT.string.isRequired,
                melding: PT.string.isRequired
            }).isRequired,
            PT.shape({}).isRequired
        ]).isRequired,
    }).isRequired
};

const mapStateToProps = ({ledetekster, traader, ui, tilgang}) => ({
    skalViseVilkarModal: ui.visVilkarModal,
    godkjenteTemagrupper: ledetekster.godkjenteTemagrupper,
    sendingStatus: traader.innsendingStatus,
    tilgang: tilgang
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {sendSporsmal, visVilkarModal, skjulVilkarModal, harTilgangTilKommunaleTemagrupper},
        dispatch
    )
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SkrivNyttSporsmal));

