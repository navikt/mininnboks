import * as React from 'react';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { getPersonNAVBaseUrl, getSfUrl } from '../environment';
import './sf-info-alertstriper.less';

function NyDialogLosning() {
    const dialogUrl = getSfUrl();
    const sakerUrl = `${getPersonNAVBaseUrl()}/mine-saker/`;
    return (
        <AlertStripeAdvarsel size="4rem" className="blokk-xl alertstripe--utvided">
            <Systemtittel>Denne siden er under endring</Systemtittel>
            <Normaltekst>
                Dine tidligere meldinger er flyttet, og er nå tilgjengelig i den <a href={dialogUrl}>nye innboksen</a>.
            </Normaltekst>
            <Normaltekst>
                En oversikt over dine saker og dokumenter er tilgjengelig i <a href={sakerUrl}>Dine saker</a>.
            </Normaltekst>
        </AlertStripeAdvarsel>
    );
}

export default NyDialogLosning;
