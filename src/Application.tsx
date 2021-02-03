import React from 'react';
import { hasError, isPending } from '@nutgaard/use-fetch';
import Routes from './routes';
import { useLedetekster } from './utils/api';
import Feilmelding from './feilmelding/Feilmelding';
import Spinner from './utils/Spinner';

function Application() {
    const ledetekster = useLedetekster();
    if (hasError(ledetekster)) {
        return <Feilmelding>Det skjedde en feil ved innlastningen av ledetekster</Feilmelding>;
    }
    if (isPending(ledetekster)) {
        return <Spinner />;
    }

    return <Routes />;
}
export default Application;
