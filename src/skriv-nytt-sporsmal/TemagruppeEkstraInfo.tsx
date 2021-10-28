import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import './temagruppe-ekstra-info.less';
import { useState } from 'react';
import { Temagruppe } from '../utils/constants';

interface Props {
    temagruppe: Temagruppe;
}

interface Info {
    heading: string;
    intro: JSX.Element;
    elementer: string[];
}

type TemagruppeInfo = {
    [P in Temagruppe]?: Array<Info>;
};

const temagruppeInfo: TemagruppeInfo = {
    PENS: [
        {
            heading: 'Har du spørsmål om AFP-etteroppgjøret?',
            intro: (
                <>
                    <Normaltekst>
                        For å beregne riktig etteroppgjør må vi ha nødvendig dokumentasjon fra deg.
                        Du finner <a href="https://www.nav.no/no/person/pensjon/avtalefestet-pensjon-afp/hva-er-afp-etteroppgjoret" target="__blank">informasjon og skjema i denne artikkelen</a>.
                    </Normaltekst>
                    <Element>Eksempler på dokumentasjon som kan sendes inn:</Element>
                </>
            ),
            elementer: [
                'Lønnsslipp fra måneden før første uttak av AFP',
                'Lønnsslipp fra måneden etter opphør av AFP',
                'Lønns- og trekkoppgave for etteroppgjørsåret'
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
                    <React.Fragment key={props.temagruppe}>
                        <Lenke
                            href="#ekstrainfo"
                            className="temagruppe-ekstra-info__lenke"
                            onClick={() => settSkjulEkstra((p) => !p)}
                        >
                            ▼ {info.heading}
                        </Lenke>
                        {ekstraInfo}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default TemagruppeEkstraInfo;
