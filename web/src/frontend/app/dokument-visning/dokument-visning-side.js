import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { markerBehandlingsIdSomLest } from './../ducks/traader';
import { hentDokumentVisningData } from './../ducks/dokumenter';
import Innholdslaster from './../innholdslaster/innholdslaster';
import Dokumentvisning from './dokument-visning';
import Breadcrumbs from '../brodsmulesti/custom-breadcrumbs';

class DokumentVisningSide extends React.Component {
    componentDidMount() {
        const { params, traader, actions } = this.props;
        const traad = traader.data.find((trad) => trad.traadId === params.id);
        if (traad && !traad.meldinger[0].lest) {
            actions.markerBehandlingsIdSomLest(params.id);
        }
        if (traad && traad.meldinger[0]) {
            const varsel = traad.meldinger[0];
            actions.hentDokumentVisningData(varsel.journalpostId, varsel.dokumentIdListe.join('-'));
        }
    }

    render() {
        const { params, routes, traader, dokumenter } = this.props;
        return (
            <Innholdslaster avhengigheter={[traader, dokumenter]} className="dokinnsyn">
                <Breadcrumbs routes={routes} params={params} />
                <Dokumentvisning {...dokumenter.data} />
            </Innholdslaster>
        );
    }
}

DokumentVisningSide.propTypes = {
    dokumenter: PT.object,
    params: PT.object.isRequired,
    routes: PT.array.isRequired,
    traader: PT.object.isRequired,
    actions: PT.shape({
        markerBehandlingsIdSomLest: PT.func.isRequired,
        hentDokumentVisningData: PT.func.isRequired
    })
};

const mapStateToProps = ({ traader, dokumenter }) => ({ traader, dokumenter });
const mapDispatchToProps = (dispatch) => ({
    actions: {
        markerBehandlingsIdSomLest: (behandlindsId) => dispatch(markerBehandlingsIdSomLest(behandlindsId)),
        hentDokumentVisningData: (journalpostId, idListe) => dispatch(hentDokumentVisningData(journalpostId, idListe))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DokumentVisningSide);
