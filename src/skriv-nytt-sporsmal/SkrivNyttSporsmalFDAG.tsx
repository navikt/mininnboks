import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { visVilkarModal, skjulVilkarModal, TypeKeys } from './../ducks/ui';
import { sendSporsmal } from './../ducks/traader';
import { Textarea } from 'nav-frontend-skjema';
import Kvittering from './Kvittering';
import Feilmelding from '../feilmelding/Feilmelding';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Sidetittel, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';

import './skriv-nytt-sporsmal.less';
import { feilmelding } from '../utils/validationutil';
import { visibleIfHOC } from '../utils/hocs/visible-if';
import { TilgangState } from '../ducks/tilgang';
import { sjekkOgOppdaterRatelimiter, sjekkRatelimiter } from '../utils/api';
import { AppState } from '../reducer';
import { Values } from '@nutgaard/use-formstate';
import { useThunkDispatch } from '../useThunkDispatch';
import Lenke from 'nav-frontend-lenker';
import GodtaVilkar from './GodtaVilkar';
import { STATUS } from '../ducks/ducks-utils';
import { useFormstate } from './SkrivNyttSporsmal';

const AlertstripeAdvarselVisibleIf = visibleIfHOC(AlertStripeAdvarsel);

const ukjentTemagruppeTittel = 'Ikke gjenkjent temagruppe';

const godkjenteTemagrupper = ['FDAG'];

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
    tilgang: TilgangState;
}

function SkrivNyttSporsmalFDAG(props: Props) {
    const [rateLimiter, setRateLimiter] = useState(true);

    const dispatch = useThunkDispatch();

    const state = useFormstate({
        fritekst: '',
        godkjennVilkaar: 'false'
    });

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

    if (!godkjenteTemagrupper.includes(temagruppe)) {
        return <Feilmelding>{ukjentTemagruppeTittel}</Feilmelding>;
    } else if (props.sendingStatus === STATUS.OK) {
        return <Kvittering />;
    }

    return (
        <article className="blokk-center send-sporsmal-side skriv-nytt-sporsmal">
            <Sidetittel className="text-center blokk-m">Tilbakebetaling av forskudd på dagpenger</Sidetittel>
            <form className="panel" onSubmit={state.onSubmit(submitHandler)}>
                <i className="meldingikon" />
                <Innholdstittel tag="h2" className="blokk-xl text-center">
                    Skriv melding
                </Innholdstittel>
                <div className="blokk-xs">
                    <AlertstripeAdvarselVisibleIf visibleIf={!rateLimiter}>
                        Du har oversteget antall meldinger som kan sendes til NAV på kort tid. Prøv igjen på ett senere
                        tidspunkt.
                    </AlertstripeAdvarselVisibleIf>
                    <AlertstripeAdvarselVisibleIf visibleIf={props.sendingStatus === STATUS.ERROR}>
                        Det har skjedd en feil med innsendingen av spørsmålet ditt. Vennligst prøv igjen senere.
                    </AlertstripeAdvarselVisibleIf>
                    <AlertStripeInfo className="blokk-xs">
                        Hvis spørsmålet ditt gjelder noe annet enn tilbakebetaling av forskudd kan du bruke tjenesten
                        <Lenke
                            href="https://www-q1.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/skriv+til+oss/"
                            className="Lenke"
                        >
                            {' '}
                            Skriv til oss
                        </Lenke>
                    </AlertStripeInfo>
                </div>
                <Normaltekst className="typo-normal blokk-xs">
                    Fra 1.september startet NAV med å kreve tilbake forskudd på dagpenger. Har du spørsmål om ordningen
                    kan du skrive til oss i feltet under.
                </Normaltekst>
                <Normaltekst className="typo-normal blokk-xs">
                    Hvis du vil endre nedbetalingsplanen på trekket ditt, går du til Ditt Nav og{' '}
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
                        {' '}
                        lese om tilbakebetaling av forskudd.
                    </Lenke>
                </Normaltekst>
                <div className="text-center margin">
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
                        label={'Jeg godtar vilkårene for bruk av tjenesten.'}
                        fieldstate={state.fields.godkjennVilkaar}
                        feil={feilmelding(state.fields.godkjennVilkaar)}
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
const mapStateToProps = ({ traader, ui, tilgang }: AppState) => ({
    skalViseVilkarModal: ui.visVilkarModal,
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
