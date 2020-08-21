import PT from 'prop-types';
import * as React from 'react';
import {useEffect} from 'react';
import BesvarBoks from './besvar-boks';
import Feilmelding from './../feilmelding/feilmelding';
import MeldingContainer from './melding-container';
import SkrivKnapp from './skriv-knapp';
import { STATUS } from './../ducks/utils';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { selectTraaderMedSammenslatteMeldinger } from './../ducks/traader';
import { Sidetittel } from 'nav-frontend-typografi'
import { withRouter } from 'react-router-dom';
import Alertstripe from 'nav-frontend-alertstriper'
import {visibleIfHOC} from "../utils/hocs/visible-if";
import {Traad} from "../Traad";

const AlertstripeVisibleIf = visibleIfHOC(Alertstripe);
interface Props {
    traader: Traad[],
    skalViseBesvarBoks: boolean,
    innsendingStatus: string,
    actions: TraadvisningActions,
    match: object
}
interface TraadvisningActions {
    sendSvar: (traadId : string, fritekst: string) => void,
    markerSomLest: (traadId : string) => void,
    visBesvarBoks: () => void,
    skjulBesvarBoks: () => void
}
function TraadVisning (props: Props){
        useEffect(() => {
            props.actions.markerSomLest(props.match.params.traadId)
        }, [])

        const traader = selectTraaderMedSammenslatteMeldinger(props.traader)
        const traadId = props.match.params.traadId;
        const valgttraad = props.traader.find(traad => traad.traadId === traadId);

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
                        visibleIf={props.innsendingStatus && props.innsendingStatus === STATUS.ERROR}
                        className="blokk-m"
                    >
                        <FormattedMessage id='infoboks.advarsel' />
                    </AlertstripeVisibleIf>
                    <SkrivKnapp
                        visibleIf={valgttraad.kanBesvares && !props.skalViseBesvarBoks}
                        onClick={props.actions.visBesvarBoks}
                    />
                    <AlertstripeVisibleIf
                        type="info"
                        visibleIf={valgttraad.avsluttet}
                        className="blokk-m"
                    >
                        <FormattedMessage id="skriv.ny.link">{(lenke) => (
                            <FormattedHTMLMessage id="traadvisning.kan-ikke-svare" values={{ lenke }} />
                        )}</FormattedMessage>
                    </AlertstripeVisibleIf>
                    <BesvarBoks
                        innsendingStatus={props.innsendingStatus}
                        visibleIf={props.skalViseBesvarBoks}
                        traadId={traadId}
                        avbryt={props.actions.skjulBesvarBoks}
                        submit={props.actions.sendSvar}
                    />
                    {meldingItems}
                </div>
            </div>
        );
}
const mapStateToProps = (state) => ({
    traader: selectTraaderMedSammenslatteMeldinger(state),
    innsendingStatus: state.traader.innsendingStatus,
    skalViseBesvarBoks: state.ui.visBesvarBoks
});

export default withRouter(TraadVisning);
