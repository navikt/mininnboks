import React from 'react';
import useFetch, { isPending, hasError } from '@nutgaard/use-fetch';
import Routes from './routes';
import { RESOURCES_PATH, MED_CREDENTIALS } from './utils/api';
import Feilmelding from './feilmelding/Feilmelding';
import Spinner from './utils/Spinner';

function Application() {
    const ledetekster = useFetch<{ [key: string]: string }>(RESOURCES_PATH, MED_CREDENTIALS);
    if (hasError(ledetekster)) {
        return <Feilmelding>Det skjedde en feil ved innlastningen av ledetekster</Feilmelding>;
    }
    if (isPending(ledetekster)) {
        return <Spinner />;
    }

    return <Routes />;
}
export default Application;
