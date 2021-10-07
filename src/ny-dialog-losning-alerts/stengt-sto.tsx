import * as React from "react";
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { visibleIfHOC } from "../utils/hocs/visible-if";
import './sf-info-alertstriper.less';

function StengtSTO() {
    return (
        <AlertStripeInfo size="4rem" className="blokk-xl alertstripe--utvided">
            <Systemtittel>Innsending av nye meldinger er midlertidig stengt.</Systemtittel>
            <Normaltekst>Det er for tiden ikke mulig å sende melding til NAV, vi beklager dette.</Normaltekst>
        </AlertStripeInfo>
    );
}

export default visibleIfHOC(StengtSTO);