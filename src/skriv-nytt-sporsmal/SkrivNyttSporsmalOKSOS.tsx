import * as React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Textarea } from 'nav-frontend-skjema';
import { Innholdstittel, Normaltekst, Sidetittel, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Alertstripe from 'nav-frontend-alertstriper';
import useFormstateFactory, { Validation, Values } from '@nutgaard/use-formstate';
import { sendSporsmal } from '../ducks/traader';
import { STATUS } from '../ducks/ducks-utils';
import GodtaVilkar from './GodtaVilkar';
import Kvittering from './Kvittering';
import { feilmelding } from '../utils/validationutil';
import { TilgangState } from '../ducks/tilgang';
import Spinner from '../utils/Spinner';
import { Temagruppe, TemagruppeNavn } from '../utils/constants';
import { useThunkDispatch } from '../utils/custom-hooks';
import {
    AlertstripeAdvarselVisibleIf,
    defaultFormstateConfig,
    FeilmeldingKommunalSjekk,
    SkrivNyttSporsmalForm,
    useRatelimiter,
    useTilgangSjekk
} from './common';
import VelgAdresseModal from './geografisk-tilknytning/VelgAdresseModal';
import { Adresse, formaterAdresseString } from './geografisk-tilknytning/AdresseUtils';
import './skriv-nytt-sporsmal.less';

type OKSOSSkrivNyttSporsmalForm = SkrivNyttSporsmalForm & { geografiskTilknytning: string };
const config: Validation<OKSOSSkrivNyttSporsmalForm> = {
    ...(defaultFormstateConfig as any),
    geografiskTilknytning(value: string) {
        return value && value.length > 0 ? undefined : 'GT må være valgt';
    }
};

const useFormstate = useFormstateFactory(config);

function SkrivNyttSporsmalOKSOS() {
    const [visVelgAdresseModal, settVisVelgAdresseModal] = useState<boolean>(true);
    const [valgtAdresse, settValgtAdresse] = useState<Adresse | null>(null);
    const dispatch = useThunkDispatch();
    const rateLimiter = useRatelimiter();
    const tilgang: TilgangState = useTilgangSjekk();
    const location = useLocation();
    const isDirekte = location.pathname.includes('/direkte');
    const formstate = useFormstate({
        fritekst: '',
        godkjennVilkaar: 'false',
        geografiskTilknytning: ''
    });

    if (tilgang.status === STATUS.PENDING) {
        return <Spinner />;
    } else if (tilgang.status === STATUS.ERROR) {
        return <Alertstripe type="advarsel">Noe gikk galt, vennligst prøv igjen på ett senere tidspunkt.</Alertstripe>;
    } else if (tilgang.status === STATUS.OK && tilgang.data.resultat !== 'OK') {
        return <Alertstripe type="info">{FeilmeldingKommunalSjekk[tilgang.data.resultat]}</Alertstripe>;
    } else if (formstate.submittingSuccess) {
        return <Kvittering />;
    }

    function submitHandler<S>(values: Values<OKSOSSkrivNyttSporsmalForm>): Promise<any> {
        return rateLimiter.update().then((isOK) => {
            if (isOK) {
                return dispatch(
                    sendSporsmal(Temagruppe.OKSOS, values.fritekst, isDirekte, values.geografiskTilknytning)
                );
            } else {
                return Promise.reject('rate-limiter feilmelding');
            }
        });
    }

    return (
        <article className="blokk-center send-sporsmal-side skriv-nytt-sporsmal">
            <Sidetittel className="text-center blokk-m">Send beskjed til NAV</Sidetittel>
            <VelgAdresseModal
                isOpen={visVelgAdresseModal}
                close={(adresse) => {
                    settValgtAdresse(adresse);
                    settVisVelgAdresseModal(false);
                    formstate.fields.geografiskTilknytning.setValue(adresse.geografiskTilknytning || '');
                }}
            />

            <form
                className="panel text-center"
                onSubmit={formstate.onSubmit(submitHandler, { preventConcurrent: true })}
            >
                <i className="meldingikon" />
                <Innholdstittel className="blokk-xl">Skriv melding</Innholdstittel>
                <Undertittel className="blokk-s">{TemagruppeNavn.OKSOS}</Undertittel>
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
                {valgtAdresse === null ? null : (
                    <p>
                        <b>Valgt adresse: </b>
                        {formaterAdresseString(valgtAdresse)}
                        <button
                            type="button"
                            className="lenke lenke-knapp"
                            onClick={() => settVisVelgAdresseModal(true)}
                        >
                            endre
                        </button>
                    </p>
                )}
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

export default SkrivNyttSporsmalOKSOS;
