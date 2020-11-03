import PT from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { visVilkarModal, skjulVilkarModal, TypeKeys } from './../ducks/ui';
import { sendSporsmal } from './../ducks/traader';
import { Textarea } from 'nav-frontend-skjema';
import Kvittering from './Kvittering';
import Feilmelding from '../feilmelding/Feilmelding';
import { connect } from 'react-redux';
import Brodsmuler from '../brodsmuler/Brodsmuler';
import { withRouter } from 'react-router-dom';
import { Sidetittel, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Alertstripe from 'nav-frontend-alertstriper';

import './skriv-nytt-sporsmal.less';
import { feilmelding } from '../utils/validationutil';
import { visibleIfHOC } from '../utils/hocs/visible-if';
import { TilgangState } from '../ducks/tilgang';
import { sjekkOgOppdaterRatelimiter, sjekkRatelimiter } from '../utils/api';
import { AlertStripeInfoSolid } from 'nav-frontend-alertstriper';
import { AppState } from '../reducer';
import { harData } from '../avhengigheter';
import useFormstate, { Values } from '@nutgaard/use-formstate';
import { useThunkDispatch } from '../useThunkDispatch';
import Lenke from 'nav-frontend-lenker';
import GodtaVilkar from './GodtaVilkar';
import { STATUS } from '../ducks/ducks-utils';

const AlertstripeVisibleIf = visibleIfHOC(Alertstripe);

const ukjentTemagruppeTittel = 'Ikke gjenkjent temagruppe';

const temagruppe = 'FDAG';

type SkrivNyttSporsmalFDAGForm = {
    fritekst: string;
    godkjennVilkaar: string;
};

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

const validator = useFormstate<SkrivNyttSporsmalFDAGForm>((values) => {
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

function SkrivNyttSporsmalFDAG(props: Props) {
    const [rateLimiter, setRateLimiter] = useState(true);
    const [godkjennVilkaar, setGodkjennVilkaar] = useState(false);

    const dispatch = useThunkDispatch();

    const initialValues: SkrivNyttSporsmalFDAGForm = {
        fritekst: '',
        godkjennVilkaar: ''
    };

    const state = validator(initialValues);

    useEffect(() => {
        sjekkRatelimiter().then((res) => setRateLimiter(res));
    }, []);

    function submitHandler<S>(values: Values<SkrivNyttSporsmalFDAGForm>): Promise<any> {
        return sjekkOgOppdaterRatelimiter().then((isOK) => {
            if (isOK) {
                return dispatch(sendSporsmal(temagruppe, values.fritekst, false));
            } else {
                setRateLimiter(isOK);
                return new Promise((resolve, reject) => reject('rate-limiter feilmelding'));
            }
        });
    }

    if (!props.godkjenteTemagrupper.includes(temagruppe)) {
        return <Feilmelding>{ukjentTemagruppeTittel}</Feilmelding>;
    } else if (props.sendingStatus === STATUS.OK) {
        return <Kvittering />;
    }

    return (
        <article className="blokk-center send-sporsmal-side skriv-nytt-sporsmal">
            <Brodsmuler />
            <Sidetittel className="text-center blokk-m">Tilbakebetaling av forskudd på dagpenger</Sidetittel>
            <form className="panel" onSubmit={state.onSubmit(submitHandler)}>
                <i className="meldingikon" />
                <Innholdstittel tag="h2" className="blokk-xl text-center">
                    Skriv melding
                </Innholdstittel>
                <AlertstripeVisibleIf type="advarsel" visibleIf={!rateLimiter}>
                    Du har oversteget antall meldinger som kan sendes til NAV på kort tid. Prøv igjen på ett senere
                    tidspunkt.
                </AlertstripeVisibleIf>
                <AlertstripeVisibleIf type="advarsel" visibleIf={props.sendingStatus === STATUS.ERROR}>
                    Det har skjedd en feil med innsendingen av spørsmålet ditt. Vennligst prøv igjen senere.
                </AlertstripeVisibleIf>
                <AlertStripeInfoSolid className="blokk-xs">
                    Hvis spørsmålet ditt gjelder noe annet enn tilbakebetaling av forskudd kan du bruke tjenesten
                    <Lenke href="skriv.ny.link" className="Lenke">
                        {' '}
                        Skriv til Oss
                    </Lenke>
                </AlertStripeInfoSolid>
                <Normaltekst className="typo-normal blokk-xs">
                    Fra 1.september startet NAV med å kreve tilbake forskudd på dagpenger. Har du spørsmål om ordningen
                    kan du skrive til oss i feltet under.
                </Normaltekst>
                <Normaltekst className="typo-normal blokk-xs">
                    Hvis du vil endre nedbetalingsplanen på trekket ditt, går du til Ditt Nav og&nbsp;
                    <Lenke href="https://www.nav.no/dagpenger/forskudd/oversikt" className="Lenke">
                        endrer nedbetalingsplanen
                    </Lenke>{' '}
                    der.
                </Normaltekst>
                <Normaltekst className="typo-normal blokk-xs">
                    Du kan også
                    <Lenke
                        href="https://www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite/kampanje-korona/tilbakebetaling-og-trekk-av-forskudd-pa-dagpenger"
                        className="Lenke"
                    >
                        lese om tilbakebetaling av forskudd.
                    </Lenke>
                </Normaltekst>
                <Textarea
                    textareaClass="fritekst"
                    label={''}
                    maxLength={1000}
                    {...state.fields.fritekst.input}
                    feil={feilmelding(state.fields.fritekst)}
                />
                <div className="text-center">
                    <GodtaVilkar
                        visModal={props.skalViseVilkarModal}
                        actions={props.actions}
                        setVilkaarGodtatt={setGodkjennVilkaar}
                        villkaarGodtatt={godkjennVilkaar}
                        inputName="godkjennVilkaar"
                        label={'Jeg godtar vilkårene for bruk av tjenesten.'}
                        {...state.fields.godkjennVilkaar.input}
                    />
                    <Hovedknapp
                        spinner={props.sendingStatus === STATUS.PENDING}
                        aria-disabled={props.sendingStatus === STATUS.PENDING}
                    >
                        Send
                    </Hovedknapp>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SkrivNyttSporsmalFDAG));
