import PT from 'prop-types';
import React from 'react';
import { tilAvsnitt, prettyDate, leggTilLenkerTags } from '../utils';
import Snakkeboble from 'nav-frontend-snakkeboble';
import {Normaltekst, Element } from 'nav-frontend-typografi';

import './melding-container.less';


function MeldingContainer({ melding }) {
    const fraBruker = melding.fraBruker;
    const imgSrc = "ikon " + (fraBruker ? 'person-ikon' : 'nav-ikon');
    const dato = prettyDate(melding.opprettet);

    const avsnitt = melding.fritekst.split(/[\r\n]+/)
        .map(leggTilLenkerTags)
        .map(tilAvsnitt);

    return (
        <Snakkeboble ikonClass={imgSrc} pilHoyre={fraBruker}>
            <Element tag="h2">{melding.statusTekst}</Element>
            <Normaltekst className="tema-avsnitt">{dato}</Normaltekst>
            <Normaltekst className="avsnitt">{avsnitt}</Normaltekst>
        </Snakkeboble>
    );
}
MeldingContainer.propTypes = {
    melding: PT.shape({
        fraBruker: PT.bool,
        fritekst: PT.string,
        statusTekst: PT.string
    }),
    intl: PT.object.isRequired
};

export default MeldingContainer;
