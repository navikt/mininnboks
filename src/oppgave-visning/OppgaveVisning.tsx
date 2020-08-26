import * as React from 'react';
import { connect } from 'react-redux';
import Spinner from '../utils/Spinner';
import { markerTraadSomLest } from './../ducks/traader';
import { withRouter } from 'react-router-dom';
import {Traad} from "../Traad";
import {useEffect} from "react";


interface Props {
    match: any,
    traader: Traad[],
    markerSomLest: (traadId : string) => void
}

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

const mapStateToProps = ({ traader }) => ({ traader });
const mapDispatchToProps = (dispatch) => ({
    markerSomLest: {
        markerSomLest: (id) => dispatch(markerTraadSomLest(id))
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OppgaveVisning));
