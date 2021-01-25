import * as React from 'react';
import Feilmelding from '../feilmelding/Feilmelding';
import Spinner from '../utils/Spinner';
import { STATUS } from '../ducks/ducks-utils';
import { getLogger } from '../utils';
import { Avhengighet } from '../avhengigheter';

const array = (value: unknown[]) => (Array.isArray(value) ? value : [value]);
const harStatus = (...status: STATUS[]) => (element: Avhengighet<unknown>) => array(status).includes(element.status);
const noenHarFeil = (avhengigheter: Avhengighet<unknown>[]) =>
    avhengigheter && avhengigheter.some(harStatus(STATUS.ERROR));
const alleLastet = (avhengigheter: Avhengighet<unknown>[]) =>
    avhengigheter && avhengigheter.every(harStatus(STATUS.OK, STATUS.RELOADING));
const medFeil = (avhengigheter: Avhengighet<unknown>[]) => avhengigheter.filter(harStatus(STATUS.ERROR));

interface Props extends React.HTMLAttributes<HTMLElement> {
    avhengigheter: Array<Avhengighet<unknown>>;
    feilmelding?: string;
}

function Innholdslaster(props: Props) {
    if (alleLastet(props.avhengigheter)) {
        if (typeof props.children === 'function') {
            return <>{props.children(props.avhengigheter)}</>;
        }
        return <>{props.children}</>;
    }

    if (noenHarFeil(props.avhengigheter)) {
        const feilendeReducer = medFeil(props.avhengigheter);
        console.log(feilendeReducer); // eslint-disable-line no-console

        const feilmelding = props.feilmelding || 'Det skjedde en feil ved innlastningen av data';

        getLogger().error(`${feilmelding}: ${JSON.stringify(feilendeReducer)}`);

        return <Feilmelding>{feilmelding}</Feilmelding>;
    }
    return <Spinner />;
}

export default Innholdslaster;
