import * as React from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import Feilmelding from "../../../feilmelding/Feilmelding";
import { Undertittel } from 'nav-frontend-typografi';

import './dokument-feilmelding.less'

function createMarkup(markuptekst : string) {
    return {
        __html: markuptekst
    };
}
interface Props {
    url: string;
    ekstrafeilinfo: { [key:string]: string };
    feilmelding: string;
}

function DokumentFeilmelding (props : Props){
        const intl = useIntl();
        const enonicFeilmeldingstekstKey = props.feilmelding.concat('.tekst');
        const innhold = intl.formatMessage({ id: enonicFeilmeldingstekstKey }, props.ekstrafeilinfo);

        return (
            <div className="dokument-feilmelding feilmelding-container">
                <img src={props.url} alt=""/>

                <Feilmelding className="feilmelding">
                    <Undertittel tag="h1">
                        <FormattedMessage id={ props.feilmelding.concat('.tittel') }/>
                    </Undertittel>
                    <p dangerouslySetInnerHTML={ createMarkup(innhold) }/>
                </Feilmelding>
            </div>
        );
}

export default DokumentFeilmelding;
