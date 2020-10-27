import * as React from 'react';
import { useEffect } from 'react';
import { getTraaderSafe, markerTraadSomLest } from './../ducks/traader';
import { Traad } from '../Traad';
import { useSelector } from 'react-redux';
import { AppState } from '../reducer';
import Spinner from '../utils/Spinner';
import { useThunkDispatch } from '../useThunkDispatch';
import { useParams } from 'react-router';

function OppgaveVisning() {
    const dispatch = useThunkDispatch();
    const params = useParams<{ id: string }>();
    const traaderResources = useSelector((state: AppState) => state.traader);
    const traader = getTraaderSafe(traaderResources);
    useEffect(() => {
        const traadId = params.id;
        const traad = traader.find((trad: Traad) => trad.traadId === traadId);
        const oppgaveUrl = traad && traad.nyeste.oppgaveUrl ? traad.nyeste.oppgaveUrl : '';
        dispatch(markerTraadSomLest(traadId)).then(() => {
            window.location.replace(oppgaveUrl);
        });
    }, []);

    return <Spinner />;
}

export default OppgaveVisning;
