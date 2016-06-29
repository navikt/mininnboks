import React from 'react'
import { connect } from 'react-redux';
import { lesDokumentVarsel } from '../utils/actions/actions';


class DokumentVarsel extends React.Component {
    componentDidMount() {
        const { dispatch, params, traader } = this.props;
        const traad = traader.filter( (traad) => traad.traadId === params.id)[0];
        if(traad && !traad.meldinger[0].lest) {
            dispatch(lesDokumentVarsel(params.id));
        }
    }

    render() {
        return (
            <noscript/>
        );
    }
}

const mapStateToProps = ({ traader  }) => ({ traader });

export default connect(mapStateToProps)(DokumentVarsel);
