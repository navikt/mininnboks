import * as React from 'react';
import { markerTraadSomLest } from './../ducks/traader';
import {Traad} from "../Traad";
import { useEffect} from "react";
import {useSelector} from "react-redux";
import { useParams } from 'react-router';
import {AppState} from "../reducer";
import Spinner from "../utils/Spinner";
import {hasTraader} from "../traader/Traader";
import {useThunkDispatch} from "../useThunkDispatch";


function OppgaveVisning() {
    const dispatch = useThunkDispatch();
    const params = useParams<{ id: string }>();
    const traaderResources = useSelector((state : AppState) => state.traader);
    const traader = hasTraader(traaderResources)
    useEffect(() => {
        const traadId = params.id;
        const traad = traader.find((trad : Traad) => trad.traadId === traadId);
        const oppgaveUrl = traad ? traad.nyeste.oppgaveUrl : ''
        dispatch(markerTraadSomLest(traadId))
            .then(() => {
                window.location.replace(oppgaveUrl);
            });
    }, [])

    return <Spinner/>;
}


export default OppgaveVisning;
