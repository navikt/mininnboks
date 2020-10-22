import * as React from 'react';
import { Dispatch} from 'redux';
import {visVilkarModal, skjulVilkarModal, TypeKeys} from '../ducks/ui';
import {sendSporsmal} from '../ducks/traader';
import {STATUS} from '../ducks/ducks-utils';
import {TextareaControlled} from 'nav-frontend-skjema';
import GodtaVilkar from './GodtaVilkar';
import Kvittering from './Kvittering';
import TemagruppeEkstraInfo, { Temagruppe } from './TemagruppeEkstraInfo';
import Feilmelding from '../feilmelding/Feilmelding';
import {FormattedMessage} from 'react-intl';
import {connect, useDispatch} from 'react-redux';
import Brodsmuler from '../brodsmuler/Brodsmuler';
import {withRouter} from 'react-router-dom';
import {Sidetittel, Innholdstittel, Undertittel, Normaltekst} from 'nav-frontend-typografi'
import {Hovedknapp} from 'nav-frontend-knapper';
import Alertstripe from 'nav-frontend-alertstriper'

import './skriv-nytt-sporsmal.less';
import {validate} from "../utils/validationutil";
import {visibleIfHOC} from "../utils/hocs/visible-if";
import { harTilgangTilKommunaleTemagrupper, TilgangState } from '../ducks/tilgang';
import {sjekkOgOppdaterRatelimiter, sjekkRatelimiter} from "../utils/api";
import {FormEvent, useEffect, useState} from "react";
import {useParams, useLocation} from "react-router";
import {AppState} from "../reducer";
import Spinner from "../utils/Spinner";
import {harData} from "../avhengigheter";

const AlertstripeVisibleIf = visibleIfHOC(Alertstripe);

const ukjentTemagruppeTittel = <FormattedMessage id="skriv-sporsmal.ukjent-temagruppe"/>;
const godkjenteTemagrupper = ['ARBD'];

interface Props {
    actions: {
        visVilkarModal: () => { type: TypeKeys, data: boolean  };
        skjulVilkarModal: () => { type: TypeKeys, data: boolean  };
    }
    skalViseVilkarModal: boolean;
    sendingStatus: string;
    godkjenteTemagrupper: string[];
    tilgang: TilgangState
}
interface Errors {
    fritekst?: string
    godkjennVilkaar?: string
}

function SkrivNyttSporsmal(props: Props) {

    const [rateLimiter, setRateLimiter] = useState(true);
    const [error, setError] = useState<Errors>({fritekst: undefined, godkjennVilkaar: undefined});
    const params = useParams<{ temagruppe: Temagruppe }>();
    const [fritekst, setFritekst] = useState('');
    const [godkjennVilkaar, setGodkjennVilkaar] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const temagruppe = params.temagruppe.toLowerCase();
        if (temagruppe === 'oksos') {
            dispatch(harTilgangTilKommunaleTemagrupper());
        }
        sjekkRatelimiter().then((res) => setRateLimiter(res));
    }, []);

    const location = useLocation();
    const temagruppe = params.temagruppe;
    const isDirekte = location.pathname.includes('/direkte');

    if (temagruppe.toLowerCase() === 'oksos') {
        if (props.tilgang.status === STATUS.PENDING) {
            return <Spinner/>;
        } else if (props.tilgang.status === STATUS.ERROR) {
            return (
                <Alertstripe type="advarsel">
                    <FormattedMessage id={`feilmelding.kommunalsjekk.fetchfeilet`}/>
                </Alertstripe>
            );
        } else if (props.tilgang.status === STATUS.OK && props.tilgang.data.resultat !== 'OK') {
            return (
                <Alertstripe type="info">
                    <FormattedMessage id={`feilmelding.kommunalsjekk.${props.tilgang.data.resultat}`}/>
                </Alertstripe>
            );
        }
    }

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (props.sendingStatus === STATUS.PENDING) {
            return;
        }
        setError(validate({ fritekst, godkjennVilkaar }));
        sjekkOgOppdaterRatelimiter()
            .then((isOK) => {
                      if (isOK) {
                          if (!Object.entries(error).length) {
                              dispatch(sendSporsmal(temagruppe, fritekst, isDirekte));
                          }
                      } else {
                          setRateLimiter(isOK);
                      }
                  }
            );
    };

    if (!godkjenteTemagrupper.includes(temagruppe)) {
        return (
            <Feilmelding>{ukjentTemagruppeTittel}</Feilmelding>
        );
    } else if (props.sendingStatus === STATUS.OK) {
        return <Kvittering/>;
    }

    const fritekstError = error.fritekst;
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
                <AlertstripeVisibleIf type="advarsel" visibleIf={!rateLimiter}>
                    <FormattedMessage id="feilmelding.ratelimiter"/>
                </AlertstripeVisibleIf>
                <AlertstripeVisibleIf type="advarsel" visibleIf={props.sendingStatus === STATUS.ERROR}>
                    <FormattedMessage id="infoboks.advarsel"/>
                </AlertstripeVisibleIf>
                <Normaltekst className="typo-normal blokk-xs">
                    <FormattedMessage id="textarea.infotekst"/>
                </Normaltekst>
                <TemagruppeEkstraInfo temagruppe={temagruppe}/>
                {fritekstFeilmelding}
                <TextareaControlled
                    defaultValue={''}
                    name="fritekst"
                    textareaClass="fritekst"
                    label={''}
                    maxLength={1000}
                    onChange={(e) => setFritekst(e.currentTarget.value)}
                />
                <GodtaVilkar
                    visModal={props.skalViseVilkarModal}
                    actions={props.actions}
                    inputName="godkjennVilkaar"
                    skalViseFeilmelding={!!error.godkjennVilkaar}
                    setVilkaarGodtatt={setGodkjennVilkaar}
                />
                <Hovedknapp htmlType="submit" spinner={props.sendingStatus === STATUS.PENDING} aria-disabled={props.sendingStatus === STATUS.PENDING}>
                    <FormattedMessage id="send-sporsmal.still-sporsmal.send-inn"/>
                </Hovedknapp>
            </form>
        </article>
    );
}

const mapStateToProps = ({ledetekster, traader, ui, tilgang} : AppState) => ({
    skalViseVilkarModal: ui.visVilkarModal,
    godkjenteTemagrupper: harData(ledetekster) ? ledetekster.godkjenteTemagrupper : [],
    sendingStatus: traader.innsendingStatus,
    tilgang: tilgang
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: {
        visVilkarModal: () => dispatch(visVilkarModal()),
        skjulVilkarModal:() => dispatch(skjulVilkarModal()),
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SkrivNyttSporsmal));

