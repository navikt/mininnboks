import PT from 'prop-types';
import React from 'react';
import IntlLenke from './../utils/intl-lenke';
import {bindActionCreators} from 'redux';
import {visVilkarModal, skjulVilkarModal} from './../ducks/ui';
import {sendSporsmal} from './../ducks/traader';
import {STATUS} from './../ducks/utils';
import {TextareaControlled} from 'nav-frontend-skjema';
import GodtaVilkar from './godta-vilkar';
import Kvittering from './kvittering';
import Feilmelding from '../feilmelding/feilmelding';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import Brodsmuler from '../brodsmuler/brodsmuler';
import {withRouter} from 'react-router-dom';
import {Sidetittel, Innholdstittel, Normaltekst} from 'nav-frontend-typografi'
import {Hovedknapp} from 'nav-frontend-knapper';
import Alertstripe from 'nav-frontend-alertstriper'

import './skriv-nytt-sporsmal.less';
import {validate} from "../utils/validationutil";
import {visibleIfHOC} from "../utils/hocs/visible-if";
import {harTilgangTilKommunaleTemagrupper} from "../ducks/tilgang";
import {sjekkOgOppdaterRatelimiter, sjekkRatelimiter} from "../utils/api";
import {AlertStripeInfoSolid} from "nav-frontend-alertstriper";

const AlertstripeVisibleIf = visibleIfHOC(Alertstripe);

const ukjentTemagruppeTittel = <FormattedMessage id="skriv-sporsmal.ukjent-temagruppe"/>;

const temagruppe = "FDAG";
class SkrivNyttSporsmalFDAG extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            rateLimiter: true,
        };
    }

    componentDidMount() {
        sjekkRatelimiter().then((res) =>
            this.setState({ rateLimiter: res })
        );
    }

    render() {
        const {
            actions,
            sendingStatus,
            skalViseVilkarModal,
            godkjenteTemagrupper
        } = this.props;

        const {
            errors,
            rateLimiter
        } = this.state;

        const submit = (event) => {
            event.preventDefault();

            const elements = event.target.elements;
            const fritekst = elements.fritekst.value;
            const godkjennVilkaar = elements.godkjennVilkaar.checked;

            if(sendingStatus === STATUS.PENDING) {
                return;
            }
            const errors = validate({
                fritekst,
                godkjennVilkaar
            });

            this.setState({
                errors: errors,
            });

            sjekkOgOppdaterRatelimiter()
                .then((isOK) => {
                        if(isOK){
                            if (!Object.entries(errors).length) {
                                actions.sendSporsmal(temagruppe, fritekst, false);
                            }
                        } else {
                            this.setState({ rateLimiter: isOK });
                        }
                    }

                )
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

        return (
            <article className="blokk-center send-sporsmal-side skriv-nytt-sporsmal">
                <Brodsmuler/>
                <Sidetittel className="text-center blokk-m">
                    Tilbakebetaling av forskudd på dagpenger
                </Sidetittel>
                <form className="panel" onSubmit={submit}>
                    <i className="meldingikon"/>
                    <Innholdstittel tag="h2" className="blokk-xl text-center">
                        Skriv melding
                    </Innholdstittel>
                    <AlertstripeVisibleIf type="advarsel" visibleIf={!rateLimiter}>
                        <FormattedMessage id="feilmelding.ratelimiter"/>
                    </AlertstripeVisibleIf>
                    <AlertstripeVisibleIf type="advarsel" visibleIf={sendingStatus && sendingStatus === STATUS.ERROR}>
                        <FormattedMessage id="infoboks.advarsel"/>
                    </AlertstripeVisibleIf>
                    <AlertStripeInfoSolid className="blokk-xs">
                        Hvis ditt spørsmål gjelder noe annet enn tilbakebetaling av forskudd kan du bruke
                        <IntlLenke href="skriv.ny.link" className="Lenke"> Skriv til Oss</IntlLenke>
                    </AlertStripeInfoSolid>
                    <Normaltekst className="typo-normal blokk-xs">
                        Fra 1.september startet NAV med å kreve tilbake forskudd på dagpenger.
                        Har du spørsmål om ordningen kan du skrive til oss i feltet under.
                    </Normaltekst>
                    <Normaltekst className="typo-normal blokk-xs">
                        Hvis du vil endre nedbetalingsplanen på trekket ditt, går du til DittNav og&nbsp;
                        <IntlLenke href="https://www.nav.no/dagpenger/forskudd/oversikt" className="Lenke">endrer nedbetalingsplanen</IntlLenke> der.
                    </Normaltekst>
                    <Normaltekst className="typo-normal blokk-xs">
                        Du kan også&nbsp;
                        <IntlLenke href="https://www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite/kampanje-korona/tilbakebetaling-og-trekk-av-forskudd-pa-dagpenger" className="Lenke">lese om tilbakebetaling av forskudd.</IntlLenke>
                    </Normaltekst>

                    { fritekstFeilmelding }
                    <TextareaControlled
                        name="fritekst"
                        textareaClass="fritekst"
                        label={""}
                        maxLength={1000}
                    />
                    <div className="text-center">
                        <GodtaVilkar
                            visModal={skalViseVilkarModal}
                            actions={actions}
                            inputName="godkjennVilkaar"
                            skalViseFeilmelding={!!errors.godkjennVilkaar}
                        />
                        <Hovedknapp type="submit" spinner={sendingStatus === STATUS.PENDING} aria-disabled={sendingStatus === STATUS.PENDING}>
                            <FormattedMessage id="send-sporsmal.still-sporsmal.send-inn"/>
                        </Hovedknapp>
                    </div>
                </form>
            </article>
        );
    }
}

SkrivNyttSporsmalFDAG.defaultProps = {
    godkjenteTemagrupper: ['ARBD']
};
SkrivNyttSporsmalFDAG.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SkrivNyttSporsmalFDAG));
