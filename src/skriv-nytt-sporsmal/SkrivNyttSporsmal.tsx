import * as React from 'react';
import { useLocation, useParams } from 'react-router';
import { Textarea } from 'nav-frontend-skjema';
import { Innholdstittel, Normaltekst, Sidetittel, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Alertstripe from 'nav-frontend-alertstriper';
import { Values } from '@nutgaard/use-formstate';
import { hasError, isPending } from '@nutgaard/use-fetch';
import { sendSporsmal } from '../ducks/traader';
import GodtaVilkar from './GodtaVilkar';
import Kvittering from './Kvittering';
import TemagruppeEkstraInfo from './TemagruppeEkstraInfo';
import Feilmelding from '../feilmelding/Feilmelding';
import { feilmelding } from '../utils/validationutil';
import Spinner from '../utils/Spinner';
import { Temagruppe, TemagruppeNavn } from '../utils/constants';
import { useThunkDispatch } from '../utils/custom-hooks';
import {
    AlertstripeAdvarselVisibleIf,
    AndreFeilmeldinger,
    SkrivNyttSporsmalForm,
    useFormstate,
    useRatelimiter
} from './common';
import './skriv-nytt-sporsmal.less';
import { useLedetekster } from '../utils/api';

const spesialtHandterteTemagrupper = [Temagruppe.FDAG];

function SkrivNyttSporsmal() {
    const dispatch = useThunkDispatch();
    const rateLimiter = useRatelimiter();
    const ledetekster = useLedetekster();
    const params = useParams<{ temagruppe: Temagruppe }>();
    const temagruppe = params.temagruppe.toUpperCase() as Temagruppe;
    const location = useLocation();
    const isDirekte = location.pathname.includes('/direkte');
    const formstate = useFormstate({ fritekst: '', godkjennVilkaar: 'false' });

    if (spesialtHandterteTemagrupper.includes(temagruppe)) {
        return <Alertstripe type="advarsel">Noe gikk galt, vennligst prøv igjen på ett senere tidspunkt.</Alertstripe>;
    }

    if (isPending(ledetekster)) {
        return <Spinner />;
    } else if (hasError(ledetekster)) {
        return <Alertstripe type="advarsel">Noe gikk galt, vennligst prøv igjen på ett senere tidspunkt.</Alertstripe>;
    }
    const godkjenteTemagrupper = ledetekster.data['temagruppe.liste'].split(' ');

    if (!godkjenteTemagrupper.includes(temagruppe)) {
        return <Feilmelding>{AndreFeilmeldinger.IKKE_GODKJENT_TEMAGRUPPE}</Feilmelding>;
    } else if (formstate.submittingSuccess) {
        return <Kvittering />;
    }

    function submitHandler<S>(values: Values<SkrivNyttSporsmalForm>): Promise<any> {
        return rateLimiter.update().then((isOK) => {
            if (isOK) {
                return dispatch(sendSporsmal(temagruppe, values.fritekst, isDirekte));
            } else {
                return Promise.reject('rate-limiter feilmelding');
            }
        });
    }

    return (
        <article className="blokk-center send-sporsmal-side skriv-nytt-sporsmal">
            <Sidetittel className="text-center blokk-m">Send beskjed til NAV</Sidetittel>
            <form
                className="panel text-center"
                onSubmit={formstate.onSubmit(submitHandler, { preventConcurrent: true })}
            >
                <i className="meldingikon" />
                <Innholdstittel className="blokk-xl">Skriv melding</Innholdstittel>
                <Undertittel className="blokk-s">{TemagruppeNavn[temagruppe]}</Undertittel>
                <div className="blokk-xs">
                    <AlertstripeAdvarselVisibleIf visibleIf={!rateLimiter}>
                        Du har oversteget antall meldinger som kan sendes til NAV på kort tid. Prøv igjen på ett senere
                        tidspunkt.
                    </AlertstripeAdvarselVisibleIf>
                    <AlertstripeAdvarselVisibleIf visibleIf={formstate.submittingFailed}>
                        Det har skjedd en feil med innsendingen av spørsmålet ditt. Vennligst prøv igjen senere.
                    </AlertstripeAdvarselVisibleIf>
                </div>
                <Normaltekst className="typo-normal blokk-xs">
                    Send bare beskjeder som kan ha betydning for saken din. Husk å få med alle relevante opplysninger.
                    Du kan skrive maksimalt 1000 tegn, det er cirka en halv A4-side.
                </Normaltekst>
                <TemagruppeEkstraInfo temagruppe={temagruppe} />
                <div className="text-center margin">
                    <Textarea
                        textareaClass="fritekst"
                        label={''}
                        maxLength={1000}
                        {...formstate.fields.fritekst.input}
                        feil={feilmelding(formstate.fields.fritekst)}
                    />
                    <GodtaVilkar
                        label="Jeg godtar vilkårene for bruk av tjenesten."
                        fieldstate={formstate.fields.godkjennVilkaar}
                        feil={feilmelding(formstate.fields.godkjennVilkaar)}
                    />
                    <Hovedknapp
                        htmlType="submit"
                        type="hoved"
                        spinner={formstate.submitting}
                        aria-disabled={formstate.submitting}
                    >
                        Send
                    </Hovedknapp>
                </div>
            </form>
        </article>
    );
}

export default SkrivNyttSporsmal;
