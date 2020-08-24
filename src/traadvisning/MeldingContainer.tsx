import * as React from 'react';
import { prettyDate } from '../utils';
import Snakkeboble from 'nav-frontend-snakkeboble';
import Tekstomrade from 'nav-frontend-tekstomrade';
import {Normaltekst, Element } from 'nav-frontend-typografi';

import './melding-container.less';
import {Melding} from "../Traad";

interface Props {
    melding: Melding
}
function MeldingContainer(props : Props) {
    const fraBruker = props.melding.fraBruker;
    const imgSrc = "ikon " + (fraBruker ? 'person-ikon' : 'nav-ikon');
    const dato = prettyDate(props.melding.opprettet);

    const fritekst = props.melding.fritekst || "";

    return (
        <Snakkeboble ikonClass={imgSrc} pilHoyre={fraBruker}>
            <Element tag="h2">{props.melding.statusTekst}</Element>
            <Normaltekst className="tema-avsnitt">{dato}</Normaltekst>
            <Tekstomrade>{fritekst}</Tekstomrade>
        </Snakkeboble>
    );

}

export default MeldingContainer;
