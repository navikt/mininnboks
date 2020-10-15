import * as React from 'react';
import {harTraader, markerTraadSomLest} from './../ducks/traader';
import {Traad} from "../Traad";
import { useEffect} from "react";

import Spinner from "../utils/Spinner";
import {useThunkDispatch} from "../useThunkDispatch";
import { useParams } from 'react-router';
import {useAppState} from "../utils/custom-hooks";


function OppgaveVisning() {
    const dispatch = useThunkDispatch();
    const params = useParams<{traadId: string }>();
    const traader = useAppState((state) => state.traader);

    useEffect(() => {
        const traadId = params.traadId;
        const traad = harTraader(traader) && traader.data.find((trad : Traad) => trad.traadId === traadId);
        const oppgaveUrl = traad ? traad.nyeste.oppgaveUrl : ''
        dispatch(markerTraadSomLest(traadId))
            .then(() => {
                window.location.replace(oppgaveUrl);
            });
    }, [])

    return <Spinner/>;
}


export default OppgaveVisning;
