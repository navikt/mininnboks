import * as React from 'react';
import { injectIntl } from 'react-intl';
import Feilmelding from '../feilmelding/Feilmelding';
import Spinner from '../utils/Spinner';
import { storeShape } from '../proptype-shapes';
import { STATUS } from '../ducks/ducks-utils';
import {getLogger} from "../utils";
import {Avhengigheter} from "./avhengigheter";

const array = (value : any[]) => (Array.isArray(value) ? value : [value]);
const harStatus = (...status) => (element) => array(status).includes(element.status);
const noenHarFeil = (avhengigheter) => avhengigheter && avhengigheter.some(harStatus(STATUS.ERROR));
const alleLastet = (avhengigheter) => avhengigheter && avhengigheter.every(harStatus(STATUS.OK, STATUS.RELOADING));
const medFeil = (avhengigheter) => avhengigheter.filter(harStatus(STATUS.ERROR));

interface Props {
    avhengigheter: Avhengigheter[];
    children: JSX.Element;
    intl: any;
    feilmeldingKey: string;
}

function Innholdslaster(props: Props){
    if (alleLastet(props.avhengigheter)) {
        if (typeof props.children === 'function') {
            return <>{props.children(props.avhengigheter)}</>;
        }
        return <>{children}</>;
    }

    if (noenHarFeil(avhengigheter)) {
        const feilendeReducer = medFeil(avhengigheter);
        console.log(feilendeReducer); // eslint-disable-line no-console

        const feilmelding = (feilmeldingKey && intl.messages[feilmeldingKey]) || (
            'Det skjedde en feil ved innlastningen av data'
            );

        getLogger().error(`${feilmelding}: ${JSON.stringify(feilendeReducer)}`);

        return (
            <Feilmelding>{feilmelding}</Feilmelding>
        );
    }
    return <Spinner />;
};

Innholdslaster.propTypes = {
    avhengigheter: PT.arrayOf(storeShape(PT.object)),
    children: PT.oneOfType([PT.node, PT.func]).isRequired,
    intl: PT.object.isRequired,
    feilmeldingKey: PT.string
};

export default injectIntl(Innholdslaster);
