import * as React from "react";
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { getSfUrl } from "../environment";
import { visibleIfHOC } from "../utils/hocs/visible-if";
import './sf-info-alertstriper.less';

function NyDialogLosning() {
    const url = getSfUrl();
    return (
        <AlertStripeInfo size="4rem" className="blokk-xl alertstripe--utvided">
            <Systemtittel>Ny innboks</Systemtittel>
            <Normaltekst>Endring av innboks, her finner du dokumenter.</Normaltekst>
            <Normaltekst>Ønsker du å se dialog/meldinger mellom deg og NAV kan du gå hit: <a href={url}>{url}</a></Normaltekst>
        </AlertStripeInfo>
    );
}

export default visibleIfHOC(NyDialogLosning);