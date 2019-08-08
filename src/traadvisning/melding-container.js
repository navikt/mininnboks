import PT from 'prop-types';
import React from 'react';
import { prettyDate } from '../utils';
import Snakkeboble from 'nav-frontend-snakkeboble';
import Tekstomrade from 'nav-frontend-tekstomrade';
import {Normaltekst, Element } from 'nav-frontend-typografi';

import './melding-container.less';


function MeldingContainer({ melding }) {
    const fraBruker = melding.fraBruker;
    const imgSrc = "ikon " + (fraBruker ? 'person-ikon' : 'nav-ikon');
    const dato = prettyDate(melding.opprettet);

    const fritekst = melding.fritekst || "";

    return (
        <Snakkeboble ikonClass={imgSrc} pilHoyre={fraBruker}>
            <Element tag="h2">{melding.statusTekst}</Element>
            <Normaltekst className="tema-avsnitt">{dato}</Normaltekst>
            <Tekstomrade>{fritekst}</Tekstomrade>
        </Snakkeboble>
    );
}
MeldingContainer.propTypes = {
    melding: PT.shape({
        fraBruker: PT.bool,
        fritekst: PT.string,
        statusTekst: PT.string
    })
};

export default MeldingContainer;
