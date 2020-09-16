import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import IntlLenke from '../utils/IntlLenke';
import { nyesteTraadForst } from '../utils';
import MeldingListe from './MeldingListe';
import {connect} from 'react-redux';
import VisibleIf from '../utils/hocs/visible-if';
import { selectTraaderMedSammenslatteMeldinger } from './../ducks/traader';
import { withRouter } from 'react-router-dom';
import {Sidetittel} from 'nav-frontend-typografi'
import './listevisning.less';
import {Melding, Traad} from "../Traad";
import {useParams} from 'react-router';
import { AppState } from 'reducer';


interface StateFromProps {
    traader: Traad[]
}

const getTraadLister = (traader : Traad[]) => {
    const sortert = traader.sort(nyesteTraadForst);
    const uleste = sortert.filter(traad => !traad.nyeste.lest);
    const leste = sortert.filter(traad => traad.nyeste.lest);

    return {
        uleste,
        leste
    };
};

const erAktivRegel = (varselId : string ) => ( melding : Melding) => melding.korrelasjonsId === varselId;

function ListeVisning( props : StateFromProps) {
    const params = useParams<{ varselId: string }>();
    const traaderGruppert = getTraadLister(props.traader);
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
            <VisibleIf visibleIf={props.traader.length === 0}>
                <h2 className="typo-undertittel text-center">
                    <FormattedMessage id="innboks.tom-innboks-melding" />
                </h2>
            </VisibleIf>
            <VisibleIf visibleIf={props.traader.length > 0}>
                <MeldingListe meldinger={ulesteTraader} overskrift="innboks.uleste" />
                <MeldingListe meldinger={lesteTraader} overskrift="innboks.leste" />
            </VisibleIf>
        </>
    );
}


const mapStateToProps = (state : AppState) => ({
    traader: selectTraaderMedSammenslatteMeldinger(state)
});
export default withRouter(connect<StateFromProps>(mapStateToProps)(ListeVisning));
