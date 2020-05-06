import React from 'react';
import PT from 'prop-types';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import './temagruppe-ekstra-info.less';

function TemagruppeEkstraInfo(props) {
    const [skjulEkstra, settSkjulEkstra] = React.useState(true);
    if (props.temagruppe !== 'FMLI') {
        return null;
    }

    const ekstraInfo = skjulEkstra ? null : (
        <React.Fragment>
            <Normaltekst>Vi trenger følgende informasjon fra deg:</Normaltekst>
            <ul className="typo-normal">
                <li>Fødselsdatoen til barnet</li>
                <li>Navnet på barnehagen</li>
                <li>Fra hvilken dato er barnet tildelt barnehageplass</li>
                <li>Antall timer i uken barnet er tildelt barnehageplass</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="temagruppe-ekstra-info blokk-m">
            <Element className="text-center blokk-xxs">Aktuelt</Element>
            <Lenke
                href="#ekstrainfo"
                className="temagruppe-ekstra-info__lenke"
                onClick={() => settSkjulEkstra(p => !p)}
            >
                ▼ Kontantstøtte: Skal du sende melding om barnehageplass?
            </Lenke>
            {ekstraInfo}
        </div>
    )
}

TemagruppeEkstraInfo.propTypes = {
    temagruppe: PT.string.isRequired
};

export default TemagruppeEkstraInfo;
