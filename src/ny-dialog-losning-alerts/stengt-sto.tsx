import * as React from "react";
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { visibleIfHOC } from "../utils/hocs/visible-if";

function StengtSTO() {
    return (
        <AlertStripeInfo size="4rem" className="blokk-xl">
            <Systemtittel>Innsending av nye meldinger er midlertidig stengt.</Systemtittel>
            <Normaltekst>Det jobbes med å flytte all informasjon til ny innboks, det er derfor ikke mulig å sende inn meldinger akkurat nå.</Normaltekst>
        </AlertStripeInfo>
    );
}

export default visibleIfHOC(StengtSTO);