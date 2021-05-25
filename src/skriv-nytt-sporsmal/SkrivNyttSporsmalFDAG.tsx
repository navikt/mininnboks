import React from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Innholdstittel, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { Values } from '@nutgaard/use-formstate';
import { sendSporsmal } from '../ducks/traader';
import Kvittering from './Kvittering';
import { feilmelding } from '../utils/validationutil';
import GodtaVilkar from './GodtaVilkar';
import { getNAVBaseUrl } from '../environment';
import { useThunkDispatch } from '../utils/custom-hooks';
import { AlertstripeAdvarselVisibleIf, SkrivNyttSporsmalForm, useFormstate, useRatelimiter } from './common';
import './skriv-nytt-sporsmal.less';
import { Temagruppe } from '../utils/constants';
import { useBreadcrumbs } from '../brodsmuler/Brodsmuler';
import { FeilmeldingOppsummering } from './FeilmeldingOppsummering';

const sendNyMeldingURL = `${getNAVBaseUrl()}/person/kontakt-oss/skriv-til-oss`;

function SkrivNyttSporsmalFDAG() {
    useBreadcrumbs([{ title: 'Ny melding', url: '/sporsmal/skriv/FDAG' }]);
    const dispatch = useThunkDispatch();
    const rateLimiter = useRatelimiter();
    const formstate = useFormstate({ fritekst: '', godkjennVilkaar: 'false' });

    if (formstate.submittingSuccess) {
        return <Kvittering />;
    }

    function submitHandler<S>(values: Values<SkrivNyttSporsmalForm>): Promise<any> {
        if (rateLimiter.isOk) {
            return dispatch(sendSporsmal(Temagruppe.FDAG, values.fritekst, false));
        } else {
            return Promise.reject('rate-limiter feilmelding');
        }
    }

    return (
        <article className="blokk-center send-sporsmal-side skriv-nytt-sporsmal">
            <Sidetittel className="text-center blokk-m">Tilbakebetaling av forskudd på dagpenger</Sidetittel>
            <form className="panel" onSubmit={formstate.onSubmit(submitHandler, { preventConcurrent: true })}>
                <i className="meldingikon" />
                <Innholdstittel tag="h2" className="blokk-xl text-center">
                    Skriv melding
                </Innholdstittel>
                <FeilmeldingOppsummering
                    formstate={formstate}
                    tittel={'For å sende melding må du rette opp følgende:'}
                />
                <div className="blokk-xs">
                    <AlertstripeAdvarselVisibleIf visibleIf={!rateLimiter.isOk}>
                        Du har oversteget antall meldinger som kan sendes til NAV på kort tid. Prøv igjen på ett senere
                        tidspunkt.
                    </AlertstripeAdvarselVisibleIf>
                    <AlertstripeAdvarselVisibleIf visibleIf={formstate.submittingFailed}>
                        Det har skjedd en feil med innsendingen av spørsmålet ditt. Vennligst prøv igjen senere.
                    </AlertstripeAdvarselVisibleIf>
                    <AlertStripeInfo className="blokk-xs">
                        Hvis spørsmålet ditt gjelder noe annet enn tilbakebetaling av forskudd kan du bruke tjenesten{' '}
                        <Lenke href={sendNyMeldingURL} className="Lenke">
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
                    Du kan også{' '}
                    <Lenke
                        href="https://www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite/kampanje-korona/tilbakebetaling-og-trekk-av-forskudd-pa-dagpenger"
                        className="Lenke"
                    >
                        lese om tilbakebetaling av forskudd.
                    </Lenke>
                </Normaltekst>
                <div className="text-center margin">
                    <Textarea
                        textareaClass="fritekst"
                        label={''}
                        maxLength={1000}
                        {...formstate.fields.fritekst.input}
                        feil={feilmelding(formstate.fields.fritekst)}
                    />
                    <GodtaVilkar
                        label={'Jeg godtar vilkårene for bruk av tjenesten.'}
                        fieldstate={formstate.fields.godkjennVilkaar}
                        feil={feilmelding(formstate.fields.godkjennVilkaar)}
                    />
                    <Hovedknapp spinner={formstate.submitting} aria-disabled={formstate.submitting}>
                        Send
                    </Hovedknapp>
                </div>
            </form>
        </article>
    );
}

export default SkrivNyttSporsmalFDAG;
