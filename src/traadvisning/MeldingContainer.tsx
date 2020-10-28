import * as React from 'react';
import Snakkeboble from 'nav-frontend-snakkeboble';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { Normaltekst, Element } from 'nav-frontend-typografi';

import './melding-container.less';
import { Melding } from '../Traad';
import { formaterDatoTidMedMaanedsnavn } from '../utils/date-utils';

interface Props {
    melding: Melding;
}
function MeldingContainer(props: Props) {
    const fraBruker = props.melding.fraBruker;
    const imgSrc = 'ikon ' + (fraBruker ? 'person-ikon' : 'nav-ikon');
    const dato = formaterDatoTidMedMaanedsnavn(props.melding.opprettet);

    const fritekst = props.melding.fritekst || '';

    return (
        <Snakkeboble ikonClass={imgSrc} pilHoyre={fraBruker}>
            <Element tag="h2">{props.melding.statusTekst}</Element>
            <Normaltekst className="tema-avsnitt">{dato}</Normaltekst>
            <Tekstomrade>{fritekst}</Tekstomrade>
        </Snakkeboble>
    );
}

export default MeldingContainer;
