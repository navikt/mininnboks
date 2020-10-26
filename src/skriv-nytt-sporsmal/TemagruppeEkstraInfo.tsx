import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import './temagruppe-ekstra-info.less';
import { useState } from 'react';

interface Props {
    temagruppe: Temagruppe;
}

interface Info {
    heading: string;
    intro: JSX.Element;
    elementer: string[];
}
export enum Temagruppe {
    ARBD = 'ARBD',
    FMLI = 'FMLI'
}

type TemagruppeInfo = {
    [P in Temagruppe]: Array<Info>;
};

const temagruppeInfo: TemagruppeInfo = {
    FMLI: [
        {
            heading: 'Kontantstøtte: Skal du sende melding om barnehageplass?',
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
            heading: 'Tar du utdanning med støtte fra Lånekassen?',
            intro: (
                <>
                    <Normaltekst>
                        Mottar du dagpenger? Skal du melde fra om at du tar utdanning med støtte fra Lånekassen?
                    </Normaltekst>
                    <Normaltekst>Du må opplyse om:</Normaltekst>
                </>
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

function TemagruppeEkstraInfo(props: Props) {
    const [skjulEkstra, settSkjulEkstra] = useState(true);
    const allInfo = temagruppeInfo[props.temagruppe];
    if (!allInfo) {
        return null;
    }

    return (
        <div className="temagruppe-ekstra-info blokk-m">
            <Element className="text-center blokk-xxs">Aktuelt</Element>
            {allInfo.map((info: Info) => {
                const ekstraInfo = skjulEkstra ? null : (
                    <>
                        {info.intro}
                        <ul className="typo-normal">
                            {info.elementer.map((element, idx) => (
                                <li key={idx}>{element}</li>
                            ))}
                        </ul>
                    </>
                );

                return (
                    <>
                        <Lenke
                            href="#ekstrainfo"
                            className="temagruppe-ekstra-info__lenke"
                            onClick={() => settSkjulEkstra((p) => !p)}
                        >
                            ▼ {info.heading}
                        </Lenke>
                        {ekstraInfo}
                    </>
                );
            })}
        </div>
    );
}

export default TemagruppeEkstraInfo;
