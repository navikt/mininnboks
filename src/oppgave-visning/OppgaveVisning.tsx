import * as React from 'react';
import { connect } from 'react-redux';
import Spinner from '../utils/Spinner';
import { markerTraadSomLest } from './../ducks/traader';
import { withRouter } from 'react-router-dom';
import {Traad} from "../Traad";
import { useEffect} from "react";
import {Dispatch} from "redux";


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

        props.markerSomLest(traadId)
            .then(() => {
                window.location.replace(traad.nyeste.oppgaveUrl);
            });
    }, [])

    return <Spinner/>;
}

const mapStateToProps = () : StateProps => ({ traader : Traad[]});
const mapDispatchToProps = (dispatch : Dispatch<any>) : DispatchProps=> ({
    markerSomLest: {
        markerSomLest: (id: string) => dispatch(markerTraadSomLest(id))
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OppgaveVisning));
