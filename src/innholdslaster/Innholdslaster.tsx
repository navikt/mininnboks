import * as React from 'react';
import {InjectedIntl, injectIntl} from 'react-intl';
import Feilmelding from '../feilmelding/Feilmelding';
import Spinner from '../utils/Spinner';
import { STATUS } from '../ducks/ducks-utils';
import {getLogger} from "../utils";

const array = (value : any[]) => (Array.isArray(value) ? value : [value]);
const harStatus = (...status) => (element) => array(status).includes(element.status);
const noenHarFeil = (avhengigheter : string[]) => avhengigheter && avhengigheter.some(harStatus(STATUS.ERROR));
const alleLastet = (avhengigheter : string[]) => avhengigheter && avhengigheter.every(harStatus(STATUS.OK, STATUS.RELOADING));
const medFeil = (avhengigheter : string[]) => avhengigheter.filter(harStatus(STATUS.ERROR));

interface Props {
    avhengigheter: any[];
    children: React.ReactNode;
    intl: InjectedIntl;
    feilmeldingKey?: string;
}

function Innholdslaster(props: Props){
    if (alleLastet(props.avhengigheter)) {
        if (typeof props.children === 'function') {
            return <>{props.children(props.avhengigheter)}</>;
        }
        return <>{props.children}</>;
    }

    if (noenHarFeil(props.avhengigheter)) {
        const feilendeReducer = medFeil(props.avhengigheter);
        console.log(feilendeReducer); // eslint-disable-line no-console

        const feilmelding = (props.feilmeldingKey && props.intl.messages[props.feilmeldingKey]) || (
            'Det skjedde en feil ved innlastningen av data'
            );

        getLogger().error(`${feilmelding}: ${JSON.stringify(feilendeReducer)}`);

        return (
            <Feilmelding>{feilmelding}</Feilmelding>
        );
    }
    return <Spinner />;
};

export default injectIntl(Innholdslaster);
