import * as React from 'react';
import BesvarBoks from './BesvarBoks';
import Feilmelding from '../feilmelding/Feilmelding';
import MeldingContainer from './MeldingContainer';
import SkrivKnapp from './SkrivKnapp';
import { markerTraadSomLest, selectTraaderMedSammenslatteMeldinger } from '../ducks/traader';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import { visibleIfHOC } from '../utils/hocs/visible-if';
import { useParams } from 'react-router';
import { visBesvarBoks } from '../ducks/ui';
import { STATUS } from '../ducks/ducks-utils';
import { useAppState, useOnMount, useScrollToTop, useThunkDispatch } from '../utils/custom-hooks';
import { getNAVBaseUrl } from '../environment';
import { useBreadcrumbs } from '../brodsmuler/Brodsmuler';

const AlertstripeVisibleIf = visibleIfHOC(Alertstripe);

interface Props {
    stengtSTO: boolean;
}

function TraadVisning(props: Props) {
    const params = useParams<{ traadId: string }>();
    const skalViseBesvarBoks = useAppState((state) => state.ui.visBesvarBoks);
    const innsendingStatus = useAppState((state) => state.traader.innsendingStatus);
    const dispatch = useThunkDispatch();
    const traader = useAppState(selectTraaderMedSammenslatteMeldinger);
    const traadId = params.traadId;

    useOnMount(() => {
        dispatch(markerTraadSomLest(traadId));
    });
    useScrollToTop();

    const valgttraad = traader.data.find((traad) => traad.traadId === traadId);
    const title = valgttraad?.nyeste.kassert ? 'Kassert dialog' : `Dialog om ${valgttraad?.nyeste.temagruppeNavn}`;
    useBreadcrumbs([{ title, url: `/traad/${params.traadId}` }]);
    if (!valgttraad) {
        return <Feilmelding>Fant ikke tråden du var ute etter</Feilmelding>;
    }

    const meldingItems = valgttraad.meldinger.map((melding) => <MeldingContainer key={melding.id} melding={melding} />);
    const skrivKnappOnClick = () => {
        dispatch(visBesvarBoks());
    };

    const sendNyMeldingURL = `${getNAVBaseUrl()}/person/kontakt-oss/skriv-til-oss`;
    const sidetittel = valgttraad.nyeste.kassert ? 'Kassert dialog' : `Dialog om ${valgttraad.nyeste.temagruppeNavn}`;
    return (
        <article className="blokk-center">
            <Sidetittel className="text-center blokk-l">{sidetittel}</Sidetittel>

            <div className="traad-container">
                <AlertstripeVisibleIf
                    type="advarsel"
                    visibleIf={innsendingStatus && innsendingStatus === STATUS.ERROR}
                    className="blokk-m"
                >
                    Det har skjedd en feil med innsendingen av spørsmålet ditt. Vennligst prøv igjen senere.
                </AlertstripeVisibleIf>
                <SkrivKnapp
                    visibleIf={valgttraad.kanBesvares && !skalViseBesvarBoks && !props.stengtSTO}
                    onClick={skrivKnappOnClick}
                />
                <AlertstripeVisibleIf type="info" visibleIf={valgttraad.avsluttet ?? false} className="blokk-m">
                    <Normaltekst>
                        Dialogen er avsluttet. Vil du <a href={sendNyMeldingURL}>sende en ny beskjed</a>, kan du gjøre
                        det her.
                    </Normaltekst>
                </AlertstripeVisibleIf>
                <BesvarBoks innsendingStatus={innsendingStatus} visibleIf={skalViseBesvarBoks} traadId={traadId} />
                {meldingItems}
            </div>
        </article>
    );
}

export default TraadVisning;
