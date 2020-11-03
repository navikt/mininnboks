import * as React from 'react';
import { Dispatch } from 'redux';
import { visVilkarModal, skjulVilkarModal, TypeKeys } from '../ducks/ui';
import { sendSporsmal } from '../ducks/traader';
import { STATUS } from '../ducks/ducks-utils';
import { Textarea } from 'nav-frontend-skjema';
import GodtaVilkar from './GodtaVilkar';
import Kvittering from './Kvittering';
import TemagruppeEkstraInfo, { Temagruppe } from './TemagruppeEkstraInfo';
import Feilmelding from '../feilmelding/Feilmelding';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Sidetittel, Innholdstittel, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Alertstripe from 'nav-frontend-alertstriper';

import './skriv-nytt-sporsmal.less';
import { feilmelding } from '../utils/validationutil';
import { visibleIfHOC } from '../utils/hocs/visible-if';
import { harTilgangTilKommunaleTemagrupper, TilgangState } from '../ducks/tilgang';
import { sjekkOgOppdaterRatelimiter, sjekkRatelimiter } from '../utils/api';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { AppState } from '../reducer';
import Spinner from '../utils/Spinner';
import { harData } from '../avhengigheter';
import useFormstate, { Values } from '@nutgaard/use-formstate';
import { useThunkDispatch } from '../useThunkDispatch';
import { Temagrupper } from '../utils/constants';

const AlertstripeVisibleIf = visibleIfHOC(Alertstripe);
const godkjenteTemagrupper = ['ARBD'];

interface Props {
    actions: {
        visVilkarModal: () => { type: TypeKeys; data: boolean };
        skjulVilkarModal: () => { type: TypeKeys; data: boolean };
    };
    skalViseVilkarModal: boolean;
    sendingStatus: string;
    godkjenteTemagrupper: string[];
    tilgang: TilgangState;
}

type SkrivNyttSporsmalForm = {
    fritekst: string;
    godkjennVilkaar: string;
};
const validator = useFormstate<SkrivNyttSporsmalForm>((values) => {
    let fritekst = undefined;
    if (values.fritekst.length === 0) {
        fritekst = 'Tekstfeltet er tomt';
    }
    if (values.fritekst.length > 1000) {
        fritekst = 'Teksten er for lang';
    }
    const godkjennVilkaar = values.godkjennVilkaar === '' ? 'Du må godta vilkårene for å sende beskjeden' : undefined;

    return { fritekst, godkjennVilkaar };
});

enum FeilmeldingKommunalSjekk {
    FEILET = 'Noe gikk galt, vennligst prøv igjen på ett senere tidspunkt.',
    KODE6 = 'Du har dessverre ikke mulighet til å benytte denne løsningen. Vi ber om at du kontakter oss på telefon.',
    INGEN_ENHET = 'Du har dessverre ikke mulighet til å benytte denne løsningen. Vi ber om at du kontakter oss på telefon.'
}
function SkrivNyttSporsmal(props: Props) {
    const [rateLimiter, setRateLimiter] = useState(true);
    const [godkjennVilkaar, setGodkjennVilkaar] = useState(false);

    const params = useParams<{ temagruppe: Temagruppe }>();
    const dispatch = useThunkDispatch();

    const initialValues: SkrivNyttSporsmalForm = {
        fritekst: '',
        godkjennVilkaar: ''
    };

    const state = validator(initialValues);

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
            return <Spinner />;
        } else if (props.tilgang.status === STATUS.ERROR) {
            return (
                <Alertstripe type="advarsel">Noe gikk galt, vennligst prøv igjen på ett senere tidspunkt.</Alertstripe>
            );
        } else if (props.tilgang.status === STATUS.OK && props.tilgang.data.resultat !== 'OK') {
            return <Alertstripe type="info">{FeilmeldingKommunalSjekk[props.tilgang.data.resultat]}</Alertstripe>;
        }
    }

    function submitHandler<S>(values: Values<SkrivNyttSporsmalForm>): Promise<any> {
        return sjekkOgOppdaterRatelimiter().then((isOK) => {
            if (isOK) {
                return dispatch(sendSporsmal(temagruppe, values.fritekst, isDirekte));
            } else {
                setRateLimiter(isOK);
                return new Promise((resolve, reject) => reject('rate-limiter feilmelding'));
            }
        });
    }

    if (!godkjenteTemagrupper.includes(temagruppe)) {
        return <Feilmelding>Ikke gjenkjent temagruppe</Feilmelding>;
    } else if (props.sendingStatus === STATUS.OK) {
        return <Kvittering />;
    }

    const valgtTemagruppe = Temagrupper[temagruppe];
    return (
        <article className="blokk-center send-sporsmal-side skriv-nytt-sporsmal">
            <Sidetittel className="text-center blokk-m">Send beskjed til NAV</Sidetittel>
            <form className="panel text-center" onSubmit={state.onSubmit(submitHandler)}>
                <i className="meldingikon" />
                <Innholdstittel className="blokk-xl">Skriv melding</Innholdstittel>
                <Undertittel className="blokk-s">{valgtTemagruppe}</Undertittel>
                <AlertstripeVisibleIf type="advarsel" visibleIf={!rateLimiter}>
                    Du har oversteget antall meldinger som kan sendes til NAV på kort tid. Prøv igjen på ett senere
                    tidspunkt.{' '}
                </AlertstripeVisibleIf>
                <AlertstripeVisibleIf type="advarsel" visibleIf={props.sendingStatus === STATUS.ERROR}>
                    Det har skjedd en feil med innsendingen av spørsmålet ditt. Vennligst prøv igjen senere.
                </AlertstripeVisibleIf>
                <Normaltekst className="typo-normal blokk-xs">
                    Send bare beskjeder som kan ha betydning for saken din. Husk å få med alle relevante opplysninger.
                    Du kan skrive maksimalt 1000 tegn, det er cirka en halv A4-side.{' '}
                </Normaltekst>
                <TemagruppeEkstraInfo temagruppe={temagruppe} key={temagruppe} />
                <Textarea
                    textareaClass="fritekst"
                    label={''}
                    maxLength={1000}
                    {...state.fields.fritekst.input}
                    feil={feilmelding(state.fields.fritekst)}
                />
                <GodtaVilkar
                    visModal={props.skalViseVilkarModal}
                    actions={props.actions}
                    inputName="godkjennVilkaar"
                    setVilkaarGodtatt={setGodkjennVilkaar}
                    villkaarGodtatt={godkjennVilkaar}
                    label={'Jeg godtar vilkårene for bruk av tjenesten.'}
                    {...state.fields.godkjennVilkaar.input}
                    feil={feilmelding(state.fields.godkjennVilkaar)}
                />
                <Hovedknapp
                    htmlType="submit"
                    spinner={props.sendingStatus === STATUS.PENDING}
                    aria-disabled={props.sendingStatus === STATUS.PENDING}
                >
                    Send
                </Hovedknapp>
            </form>
        </article>
    );
}

const mapStateToProps = ({ ledetekster, traader, ui, tilgang }: AppState) => ({
    skalViseVilkarModal: ui.visVilkarModal,
    godkjenteTemagrupper: harData(ledetekster) ? ledetekster.godkjenteTemagrupper : [],
    sendingStatus: traader.innsendingStatus,
    tilgang: tilgang
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: {
        visVilkarModal: () => dispatch(visVilkarModal()),
        skjulVilkarModal: () => dispatch(skjulVilkarModal())
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SkrivNyttSporsmal));
