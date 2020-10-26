import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import IntlLenke from '../utils/IntlLenke';
import { nyesteTraadForst } from '../utils';
import MeldingListe from './MeldingListe';
import VisibleIf from '../utils/hocs/visible-if';
import { selectTraaderMedSammenslatteMeldinger } from './../ducks/traader';
import {Sidetittel} from 'nav-frontend-typografi'
import './listevisning.less';
import {Melding, Traad} from "../Traad";
import { useLocation, useParams } from 'react-router';
import {useAppState} from "../utils/custom-hooks";



const getTraadLister = (traader : Traad[]) => {
    const sortert = traader.sort(nyesteTraadForst);
    const uleste = sortert.filter(traad => !traad.nyeste.lest);
    const leste = sortert.filter(traad => traad.nyeste.lest);

    return {
        uleste,
        leste
    };
};

const erAktivRegel = (varselId?: string ) => ( melding : Melding) => melding.korrelasjonsId === varselId;

function ListeVisning() {
    const loc = useLocation();
    console.log('ListeVisning', loc);
    const params = useParams<{ varselId?: string }>();
    const appState = useAppState(state => state);
    const traader = selectTraaderMedSammenslatteMeldinger(appState).data;
    const traaderGruppert = getTraadLister(traader);
    const erAktiv = erAktivRegel(params.varselId);

    const ulesteTraader = traaderGruppert.uleste.map((traad) => ({
        data: traad, aktiv: erAktiv(traad.nyeste), ulestMeldingKlasse: 'uleste-meldinger'
    }));
    const lesteTraader = traaderGruppert.leste.map((traad) => ({
        data: traad, aktiv: erAktiv(traad.nyeste)
    }));

    return (
        <>
            <Sidetittel className="text-center blokk-l">
                <FormattedMessage id="innboks.overskrift" />
            </Sidetittel>
            <div className="text-center blokk-l">
                <IntlLenke href="skriv.ny.link" className="knapp knapp--hoved">
                    <FormattedMessage id="innboks.skriv.ny.link" />
                </IntlLenke>
            </div>
            <VisibleIf visibleIf={traader.length === 0}>
                <h2 className="typo-undertittel text-center">
                    <FormattedMessage id="innboks.tom-innboks-melding" />
                </h2>
            </VisibleIf>
            <VisibleIf visibleIf={traader.length > 0}>
                <MeldingListe meldinger={ulesteTraader} overskrift="innboks.uleste" />
                <MeldingListe meldinger={lesteTraader} overskrift="innboks.leste" />
            </VisibleIf>
        </>
    );
}



export default ListeVisning;
