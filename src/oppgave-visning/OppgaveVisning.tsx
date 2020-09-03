import * as React from 'react';
import Spinner from '../utils/Spinner';
import { markerTraadSomLest } from './../ducks/traader';
import {Traad} from "../Traad";
import { useEffect} from "react";


interface OwnProps {
    match: any,
}
interface StateProps {
    traader: Traad[]
}

interface DispatchProps {
    markerSomLest: (traadId : string) => void
}
type Props = OwnProps & StateProps & DispatchProps;


function OppgaveVisning(props : Props) {
    useEffect(() => {
        const traadId = props.match.params.id;
        const traad = props.traader.find((trad : Traad) => trad.traadId === traadId);

        markerTraadSomLest(traadId)
            .then(() => {
                window.location.replace(traad.nyeste.oppgaveUrl);
            });
    }, [])

    return <Spinner/>;
}


export default OppgaveVisning;
