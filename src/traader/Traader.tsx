import PT from 'prop-types';
import React, {Component, ReactNode, useEffect} from 'react';
import { hentTraader } from '../ducks/traader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { storeShape, traadShape } from './../proptype-shapes';
import Innholdslaster from './../innholdslaster/innholdslaster';
import {Traad} from "../Traad";

interface TraaderProps {
    children: ReactNode
}

interface StateProps {
    traader: Array<Traad>
}

interface DispatchProps {
    hentTraader: () => Array<Traad>
}

type Props = TraaderProps & StateProps & DispatchProps;

function Traader(props : Props) {
    return (
        <Innholdslaster avhengigheter={[props.traader]}>
            {props.children}
        </Innholdslaster>
    );
}

const mapStateToProps : (state : State) => StateProps = (state) => ({  });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators({ hentTraader }, dispatch) });

export default Traader;
