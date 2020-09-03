import PT from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import Feilmelding from '../feilmelding/Feilmelding';
import Spinner from '../utils/Spinner';
import { storeShape } from '../proptype-shapes';
import { STATUS } from '../ducks/ducks-utils';
import {getLogger} from "../utils";

const array = (value) => (Array.isArray(value) ? value : [value]);
const harStatus = (...status) => (element) => array(status).includes(element.status);
const noenHarFeil = (avhengigheter) => avhengigheter && avhengigheter.some(harStatus(STATUS.ERROR));
const alleLastet = (avhengigheter) => avhengigheter && avhengigheter.every(harStatus(STATUS.OK, STATUS.RELOADING));
const medFeil = (avhengigheter) => avhengigheter.filter(harStatus(STATUS.ERROR));

const Innholdslaster = ({ avhengigheter, feilmeldingKey, intl, children }) => {
    if (alleLastet(avhengigheter)) {
        if (typeof children === 'function') {
            return <React.Fragment>{children(avhengigheter)}</React.Fragment>;
        }
        return <React.Fragment>{children}</React.Fragment>;
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
