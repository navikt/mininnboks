import * as React from 'react';
import { nyesteTraadForst } from '../utils';
import MeldingListe from './MeldingListe';
import VisibleIf from '../utils/hocs/visible-if';
import { selectTraaderMedSammenslatteMeldinger } from './../ducks/traader';
import { Sidetittel } from 'nav-frontend-typografi';
import './listevisning.less';
import { Melding, Traad } from '../Traad';
import { useAppState, useQuery } from '../utils/custom-hooks';
import { getNAVBaseUrl } from '../environment';
import { useBreadcrumbs } from '../brodsmuler/Brodsmuler';

const getTraadLister = (traader: Traad[]) => {
    const sortert = traader.sort(nyesteTraadForst);
    const uleste = sortert.filter((traad) => !traad.nyeste.lest);
    const leste = sortert.filter((traad) => traad.nyeste.lest);

    return {
        uleste,
        leste
    };
};

const erAktivRegel = (varselId: string | null) => (melding: Melding) => {
    return melding.korrelasjonsId === varselId;
};

interface Props {
    stengtSTO: boolean;
    brukerSFSomBackend: boolean;
}

function ListeVisning(props: Props) {
    useBreadcrumbs([]);
    const params = useQuery();
    const appState = useAppState((state) => state);
    const traader = selectTraaderMedSammenslatteMeldinger(appState).data;
    const traaderGruppert = getTraadLister(traader);

    const erAktiv = erAktivRegel(params.get('varselId') || params.get('varselid'));

    const ulesteTraader = traaderGruppert.uleste.map((traad) => ({
        data: traad,
        aktiv: erAktiv(traad.nyeste),
        ulestMeldingKlasse: 'uleste-meldinger'
    }));
    const lesteTraader = traaderGruppert.leste.map((traad) => ({
        data: traad,
        aktiv: erAktiv(traad.nyeste)
    }));

    const sendNyMeldingURL = `${getNAVBaseUrl()}/person/kontakt-oss/skriv-til-oss`;

    return (
        <article className="blokk-center">
            <Sidetittel className="text-center blokk-l">Innboks</Sidetittel>
            <VisibleIf visibleIf={!props.brukerSFSomBackend && !props.stengtSTO}>
                <div className="text-center blokk-l">
                    <a href={sendNyMeldingURL} className="knapp knapp--hoved">
                        Skriv ny melding
                    </a>
                </div>
            </VisibleIf>
            <VisibleIf visibleIf={traader.length === 0}>
                <h2 className="typo-undertittel text-center">Her kan du lese referater og beskjeder til og fra NAV.</h2>
            </VisibleIf>
            <VisibleIf visibleIf={traader.length > 0}>
                <MeldingListe meldinger={ulesteTraader} uleste={true} />
                <MeldingListe meldinger={lesteTraader} uleste={false} />
            </VisibleIf>
        </article>
    );
}

export default ListeVisning;
