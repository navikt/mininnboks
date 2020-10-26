import * as React from 'react';
import { useEffect } from 'react';
import BesvarBoks from './BesvarBoks';
import Feilmelding from '../feilmelding/Feilmelding';
import MeldingContainer from './MeldingContainer';
import SkrivKnapp from './SkrivKnapp';
import { FormattedMessage } from 'react-intl';
import { selectTraaderMedSammenslatteMeldinger } from '../ducks/traader';
import { Sidetittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import { visibleIfHOC } from '../utils/hocs/visible-if';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { visBesvarBoks } from '../ducks/ui';
import { markerSomLest } from '../utils/api';
import { STATUS } from '../ducks/ducks-utils';
import { useAppState } from '../utils/custom-hooks';

const AlertstripeVisibleIf = visibleIfHOC(Alertstripe);

function TraadVisning() {
    const params = useParams<{ traadId: string }>();
    const skalViseBesvarBoks = useAppState((state) => state.ui.visBesvarBoks);
    const innsendingStatus = useAppState((state) => state.traader.innsendingStatus);
    const dispatch = useDispatch();
    const traader = useAppState(selectTraaderMedSammenslatteMeldinger);

    useEffect(() => {
        markerSomLest(params.traadId);
    }, []);

    const traadId = params.traadId;
    const valgttraad = traader.data.find((traad) => traad.traadId === traadId);

    if (!valgttraad) {
        return <Feilmelding>Fant ikke tråden du var ute etter</Feilmelding>;
    }

    const meldingItems = valgttraad.meldinger.map((melding) => <MeldingContainer key={melding.id} melding={melding} />);
    const skrivKnappOnClick = () => {
        dispatch(visBesvarBoks());
    };
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
                    visibleIf={innsendingStatus && innsendingStatus === STATUS.ERROR}
                    className="blokk-m"
                >
                    <FormattedMessage id="infoboks.advarsel" />
                </AlertstripeVisibleIf>
                <SkrivKnapp visibleIf={valgttraad.kanBesvares && !skalViseBesvarBoks} onClick={skrivKnappOnClick} />
                <AlertstripeVisibleIf type="info" visibleIf={valgttraad.avsluttet ?? false} className="blokk-m">
                    <FormattedMessage id="skriv.ny.link">
                        {(lenke) => <FormattedMessage id="traadvisning.kan-ikke-svare" values={{ lenke }} />}
                    </FormattedMessage>
                </AlertstripeVisibleIf>
                <BesvarBoks innsendingStatus={innsendingStatus} visibleIf={skalViseBesvarBoks} traadId={traadId} />
                {meldingItems}
            </div>
        </div>
    );
}

export default TraadVisning;
