import PT from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import IntlLenke from '../utils/IntlLenke';
import { nyesteTraadForst } from '../utils';
import MeldingListe from './melding-liste';
import { connect } from 'react-redux';
import VisibleIf from '../utils/hocs/visible-if';
import { storeShape, traadShape } from './../proptype-shapes';
import { selectTraaderMedSammenslatteMeldinger } from './../ducks/traader';
import { withRouter } from 'react-router-dom';
import { parse } from 'query-string';
import {Sidetittel} from 'nav-frontend-typografi'

import './listevisning.less';


const getTraadLister = (traader) => {
    const sortert = traader.sort(nyesteTraadForst);
    const uleste = sortert.filter(traad => !traad.nyeste.lest);
    const leste = sortert.filter(traad => traad.nyeste.lest);

    return {
        uleste,
        leste
    };
};

const erAktivRegel = (varselid) => (melding) => melding.korrelasjonsId === varselid;

function ListeVisning({ traader, location }) {
    const queryParams = parse(location.search);
    const varselid = queryParams.varselid;
    const traaderGruppert = getTraadLister(traader.data);

    const erAktiv = erAktivRegel(varselid);

    const ulesteTraader = traaderGruppert.uleste.map((traad) => ({
        traad, aktiv: erAktiv(traad.nyeste), ulestMeldingKlasse: 'uleste-meldinger'
    }));
    const lesteTraader = traaderGruppert.leste.map((traad) => ({
        traad, aktiv: erAktiv(traad.nyeste)
    }));

    return (
        <React.Fragment>
            <Sidetittel className="text-center blokk-l">
                <FormattedMessage id="innboks.overskrift" />
            </Sidetittel>
            <div className="text-center blokk-l">
                <IntlLenke href="skriv.ny.link" className="knapp knapp--hoved">
                    <FormattedMessage id="innboks.skriv.ny.link" />
                </IntlLenke>
            </div>
            <VisibleIf visibleIf={traader.data.length === 0}>
                <h2 className="typo-undertittel text-center">
                    <FormattedMessage id="innboks.tom-innboks-melding" />
                </h2>
            </VisibleIf>
            <VisibleIf visibleIf={traader.data.length > 0}>
                <MeldingListe meldinger={ulesteTraader} overskrift="innboks.uleste" />
                <MeldingListe meldinger={lesteTraader} overskrift="innboks.leste" />
            </VisibleIf>
        </React.Fragment>
    );
}

ListeVisning.propTypes = {
    traader: storeShape(traadShape).isRequired,
    location: PT.object.isRequired
};

const mapStateToProps = state => ({
    traader: selectTraaderMedSammenslatteMeldinger(state)
});
export default withRouter(connect(mapStateToProps)(ListeVisning));
