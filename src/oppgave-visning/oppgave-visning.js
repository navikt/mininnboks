import PT from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeShape, traadShape } from './../proptype-shapes';
import { markerTraadSomLest } from '../ducks/traader';
import { withRouter } from 'react-router-dom';
import { Spinner } from '../utils/Spinner';


class OppgaveVisning extends Component {
    componentDidMount() {
        const { match, traader, actions } = this.props;
        const traadId = match.params.id;
        const traad = traader.data.find((trad) => trad.traadId === traadId);

        actions.markerSomLest(traadId)
            .then(() => {
                window.location.replace(traad.nyeste.oppgaveUrl);
            });
    }

    render() {
        return <Spinner/>;
    }
}

OppgaveVisning.propTypes = {
    match: PT.object.isRequired,
    traader: storeShape(traadShape).isRequired,
    actions: PT.shape({
        markerSomLest: PT.func.isRequired
    }).isRequired
};

const mapStateToProps = ({ traader }) => ({ traader });
const mapDispatchToProps = (dispatch) => ({
    actions: {
        markerSomLest: (id) => dispatch(markerTraadSomLest(id))
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OppgaveVisning));
