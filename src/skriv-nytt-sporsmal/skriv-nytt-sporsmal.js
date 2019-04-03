import PT from 'prop-types';
import React from 'react';
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
import {Sidetittel, Innholdstittel, Undertittel, Normaltekst} from 'nav-frontend-typografi'
import {Hovedknapp} from 'nav-frontend-knapper';
import Alertstripe from 'nav-frontend-alertstriper'

import './skriv-nytt-sporsmal.less';
import {validate} from "../utils/validationutil";
import {visibleIfHOC} from "../utils/hocs/visible-if";

const AlertstripeVisibleIf = visibleIfHOC(Alertstripe);

const ukjentTemagruppeTittel = <FormattedMessage id="skriv-sporsmal.ukjent-temagruppe"/>;

class SkrivNyttSporsmal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
        };
    }

    render() {
        const {
            match,
            actions,
            sendingStatus,
            skalViseVilkarModal,
            godkjenteTemagrupper
        } = this.props;

        const {
            errors,
        } = this.state;

        const params = match.params;
        const temagruppe = params.temagruppe;

        const submit = (event) => {
            event.preventDefault();

            if(sendingStatus === STATUS.PENDING) {
                return;
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
                actions.sendSporsmal(temagruppe, fritekst);
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

        return (
            <article className="blokk-center send-sporsmal-side skriv-nytt-sporsmal">
                <Brodsmuler/>
                <Sidetittel className="text-center blokk-m">
                    <FormattedMessage id="send-sporsmal.still-sporsmal.ny-melding-overskrift"/>
                </Sidetittel>
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
    godkjenteTemagrupper: PT.arrayOf(PT.string).isRequired
};

const mapStateToProps = ({ledetekster, traader, ui}) => ({
    skalViseVilkarModal: ui.visVilkarModal,
    godkjenteTemagrupper: ledetekster.godkjenteTemagrupper,
    sendingStatus: traader.innsendingStatus
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {sendSporsmal, visVilkarModal, skjulVilkarModal},
        dispatch
    )
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SkrivNyttSporsmal));

