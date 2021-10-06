import * as React from "react";
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { getSfUrl } from "../environment";
import { visibleIfHOC } from "../utils/hocs/visible-if";

function NyDialogLosning() {
    const url = getSfUrl();
    return (
        <AlertStripeInfo size="4rem" className="blokk-xl">
            <Systemtittel>Ny innboks er på plass</Systemtittel>
            <Normaltekst>Dine meldinger er flyttet og kan ses her: <a href={url}>{url}</a></Normaltekst>
        </AlertStripeInfo>
    );
}

export default visibleIfHOC(NyDialogLosning);