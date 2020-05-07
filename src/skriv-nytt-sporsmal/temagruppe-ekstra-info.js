import React from 'react';
import PT from 'prop-types';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import './temagruppe-ekstra-info.less';

const temagruppeInfo = {
    FMLI: [
        {
            heading: "Kontantstøtte: Skal du sende melding om barnehageplass?",
            intro: <Normaltekst>Vi trenger følgende informasjon fra deg:</Normaltekst>,
            elementer: [
                'Fødselsdatoen til barnet',
                'Navnet på barnehagen',
                'Fra hvilken dato er barnet tildelt barnehageplass',
                'Antall timer i uken barnet er tildelt barnehageplass'
            ]
        }
    ],
    ARBD: [
        {
            heading: "Tar du utdanning med støtte fra Lånekassen?",
            intro: (
                <React.Fragment>
                    <Normaltekst>Mottar du dagpenger? Skal du melde fra om at du tar utdanning med støtte fra Lånekassen?</Normaltekst>
                    <Normaltekst>Du må opplyse om:</Normaltekst>
                </React.Fragment>
            ),
            elementer: [
                'Hvilken utdanning du deltar i',
                'Hvor du gjennomfører utdanningen',
                'Når utdanningen begynte og når den slutter/ble avsluttet',
                'Hvor høy studieprogresjon du har',
                'Om utdanningen foregår på dag- eller kveldstid. Hvis dagtid, skriv hvor mange studiedager du har i semesteret',
                'For hvilken periode du mottar støtte fra Lånekassen'
            ]
        }
    ]
};

function TemagruppeEkstraInfo(props) {
    const [skjulEkstra, settSkjulEkstra] = React.useState(true);
    const allInfo = temagruppeInfo[props.temagruppe];
    if (!allInfo) {
        return null;
    }

    return (
        <div className="temagruppe-ekstra-info blokk-m">
            <Element className="text-center blokk-xxs">Aktuelt</Element>
            {allInfo.map((info) => {
                const ekstraInfo = skjulEkstra ? null : (
                    <React.Fragment>
                        {info.intro}
                        <ul className="typo-normal">
                            {info.elementer.map((element, idx) => <li key={idx}>{element}</li>)}
                        </ul>
                    </React.Fragment>
                );

                return (
                    <React.Fragment>
                        <Lenke
                            href="#ekstrainfo"
                            className="temagruppe-ekstra-info__lenke"
                            onClick={() => settSkjulEkstra(p => !p)}
                        >
                            ▼ {info.heading}
                        </Lenke>
                        {ekstraInfo}
                    </React.Fragment>
                );
            })}
        </div>
    )
}

TemagruppeEkstraInfo.propTypes = {
    temagruppe: PT.string.isRequired
};

export default TemagruppeEkstraInfo;
