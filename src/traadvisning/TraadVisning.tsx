import * as React from 'react';
import {useEffect} from 'react';
import BesvarBoks from './BesvarBoks';
import Feilmelding from '../feilmelding/Feilmelding';
import MeldingContainer from './MeldingContainer';
import SkrivKnapp from './SkrivKnapp';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { selectTraaderMedSammenslatteMeldinger } from '../ducks/traader';
import { Sidetittel } from 'nav-frontend-typografi'
import { withRouter } from 'react-router-dom';
import Alertstripe from 'nav-frontend-alertstriper'
import {visibleIfHOC} from "../utils/hocs/visible-if";
import {Traad} from "../Traad";
import {useParams} from "react-router";
import {AppState} from "../reducer";
import {connect, useDispatch} from "react-redux";
import {TypeKeys, visBesvarBoks} from "../ducks/ui";
import {markerSomLest} from "../utils/api";
import {STATUS} from "../ducks/ducks-utils";

const AlertstripeVisibleIf = visibleIfHOC(Alertstripe);
interface Props {
    traader: { data: Array<Traad> }
    skalViseBesvarBoks: boolean,
    innsendingStatus: STATUS,
    actions: TraadvisningActions,
    match: object
}

interface TraadvisningActions {
    sendSvar: (traadId : string, fritekst: string) => void,
    markerSomLest: (traadId : string) => void,
    visBesvarBoks: () => { type: TypeKeys, data: boolean },
    skjulBesvarBoks: () => { type: TypeKeys, data: boolean }
}
function TraadVisning (props: Props){
        const params = useParams<{ traadId: string }>();
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(markerSomLest(params.traadId))
        }, []);

        const traadId = params.traadId;
        const valgttraad = props.traader.data.find(traad => traad.traadId === traadId);

        if (!valgttraad) {
            return (
                <Feilmelding>Fant ikke tråden du var ute etter</Feilmelding>
            );
        }

        const meldingItems = valgttraad.meldinger.map((melding) => (
            <MeldingContainer key={melding.id} melding={melding} />
        ));
        const skrivKnappOnClick = () => {
            dispatch(visBesvarBoks());
        }
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
                        onClick={skrivKnappOnClick}
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
const mapStateToProps = (state : AppState) => ({
    traader: selectTraaderMedSammenslatteMeldinger(state),
    innsendingStatus: state.traader.innsendingStatus,
    skalViseBesvarBoks: state.ui.visBesvarBoks
});

export default withRouter(connect(mapStateToProps)(TraadVisning));
