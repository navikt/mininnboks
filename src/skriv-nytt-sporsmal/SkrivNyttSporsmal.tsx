import * as React from 'react';
import { useLocation, useParams } from 'react-router';
import { Innholdstittel, Normaltekst, Sidetittel, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Alertstripe from 'nav-frontend-alertstriper';
import { Values } from '@nutgaard/use-formstate';
import Textarea from '../components/no-aria-textarea';
import { sendSporsmal } from '../ducks/traader';
import GodtaVilkar from './GodtaVilkar';
import Kvittering from './Kvittering';
import TemagruppeEkstraInfo from './TemagruppeEkstraInfo';
import { feilmelding } from '../utils/validationutil';
import Spinner from '../utils/Spinner';
import { Temagruppe, TemagruppeNavn } from '../utils/constants';
import { useAppState, useThunkDispatch } from '../utils/custom-hooks';
import {
    AlertstripeAdvarselVisibleIf,
    FeilmeldingKommunalSjekk,
    SkrivNyttSporsmalForm,
    useFormstate,
    useTilgangSjekk
} from './common';
import './skriv-nytt-sporsmal.less';
import { STATUS } from '../ducks/ducks-utils';
import { useBreadcrumbs } from '../brodsmuler/Brodsmuler';
import { FeilmeldingOppsummering } from './FeilmeldingOppsummering';
import { TilgangState } from "../ducks/tilgang";

const spesialtHandterteTemagrupper = [Temagruppe.FDAG];

function SkrivNyttSporsmal() {
    const dispatch = useThunkDispatch();
    const params = useParams<{ temagruppe: Temagruppe }>();
    const temagruppe = params.temagruppe.toUpperCase() as Temagruppe;
    const tilgang: TilgangState = useTilgangSjekk();
    const location = useLocation();
    const isDirekte = location.pathname.includes('/direkte');
    const formstate = useFormstate({ fritekst: '', godkjennVilkaar: 'false' });
    const innsendingStatus = useAppState((state) => state.traader.innsendingStatus);

    useBreadcrumbs([{ title: 'Ny melding', url: `/sporsmal/skriv/${params.temagruppe}` }]);
    if (spesialtHandterteTemagrupper.includes(temagruppe)) {
        return <Alertstripe type="advarsel">Noe gikk galt, vennligst prøv igjen på et senere tidspunkt.</Alertstripe>;
    }

    if (temagruppe === Temagruppe.OKSOS) {
        if ([STATUS.PENDING, STATUS.NOT_STARTED].includes(tilgang.status)) {
            return <Spinner />;
        } else if (tilgang.status === STATUS.ERROR) {
            return <Alertstripe type="advarsel">Noe gikk galt, vennligst prøv igjen på et senere tidspunkt.</Alertstripe>;
        } else if (tilgang.status === STATUS.OK && tilgang.data.resultat !== 'OK') {
            return <Alertstripe type="info">{FeilmeldingKommunalSjekk[tilgang.data.resultat]}</Alertstripe>;
        }
    }
    if (formstate.submittingSuccess) {
        return <Kvittering />;
    }

    function submitHandler<S>(values: Values<SkrivNyttSporsmalForm>): Promise<any> {
        return dispatch(sendSporsmal(temagruppe, values.fritekst, isDirekte));
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
                <FeilmeldingOppsummering
                    tittel={'For å sende melding må du rette opp følgende:'}
                    formstate={formstate}
                />
                <div className="blokk-xs">
                    <AlertstripeAdvarselVisibleIf visibleIf={innsendingStatus === STATUS.TOOMANYREQUESTS}>
                        Du har oversteget antall meldinger som kan sendes til NAV på kort tid. Prøv igjen på ett senere
                        tidspunkt.
                    </AlertstripeAdvarselVisibleIf>
                    <AlertstripeAdvarselVisibleIf visibleIf={innsendingStatus === STATUS.ERROR}>
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
