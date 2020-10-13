import PT from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { markerBehandlingsIdSomLest } from '../ducks/traader';
import { hentDokumentVisningData, visLastNedPdfModal } from '../ducks/dokumenter';
import { withRouter } from 'react-router-dom';
import Feilmelding from '../feilmelding/Feilmelding';
import Dokumentvisning from './DokumentVisning';
import Innholdslaster from "../innholdslaster/Innholdslaster.tsx";
import LastNedPdfModal from "./LastNedPdfModal";

class DokumentVisningSide extends React.Component {
    constructor() {
        super();
        this.onLastNedPdfClick = this.onLastNedPdfClick.bind(this);
        this.onPrintPdfClick = this.onPrintPdfClick.bind(this);
    }
    componentDidMount() {
        const { match, traader, actions } = this.props;
        const { params } = match;

        const traad = traader.data.find((trad) => trad.traadId === params.id);
        if (traad && !traad.meldinger[0].lest) {
            actions.markerBehandlingsIdSomLest(params.id);
        }
        if (traad && traad.meldinger[0]) {
            const varsel = traad.meldinger[0];
            actions.hentDokumentVisningData(varsel.journalpostId, varsel.dokumentIdListe.join('-'));
        }
    }

    onLastNedPdfClick(url, event) {
        const { actions } = this.props;
        event.preventDefault();
        actions.visLastNedPdfModal(url);
    }

    onPrintPdfClick(url, event) {
        const { actions } = this.props;
        event.preventDefault();
        actions.visLastNedPdfModal(url);
    }

    render() {
        const { match, traader, dokumenter } = this.props;
        const { params } = match;

        const traad = traader.data.find((t) => t.traadId === params.id);
        if (!traad) {
            return (
                <Feilmelding>Fant ikke dokumentet</Feilmelding>
            );
        }

        return (
            <Innholdslaster
                avhengigheter={[dokumenter]}
                feilmeldingKey="innlastning.dokument.feil"
            >
                <LastNedPdfModal />
                <Dokumentvisning
                    params={params}
                    {...dokumenter.data}
                    lastNedPdfOnClick={this.onLastNedPdfClick}
                    printPdfOnClick={this.onPrintPdfClick}
                />
            </Innholdslaster>
        );
    }
}

DokumentVisningSide.propTypes = {
    dokumenter: PT.object,
    match: PT.object.isRequired,
    traader: PT.object.isRequired,
    actions: PT.shape({
        markerBehandlingsIdSomLest: PT.func.isRequired,
        hentDokumentVisningData: PT.func.isRequired,
        visLastNedPdfModal: PT.func.isRequired
    })
};

const mapStateToProps = ({ traader, dokumenter }) => ({ traader, dokumenter });
const mapDispatchToProps = (dispatch) => ({
    actions: {
        markerBehandlingsIdSomLest: (behandlindsId) => dispatch(markerBehandlingsIdSomLest(behandlindsId)),
        hentDokumentVisningData: (journalpostId, idListe) => dispatch(hentDokumentVisningData(journalpostId, idListe)),
        visLastNedPdfModal: (url) => dispatch(visLastNedPdfModal(url))
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DokumentVisningSide));
