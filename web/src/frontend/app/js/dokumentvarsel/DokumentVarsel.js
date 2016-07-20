import React from 'react'
import { connect } from 'react-redux';
import { lesDokumentVarsel } from '../utils/actions/actions';
import { hentDokumentVisningData } from './varsel-actions';
import Dokumentvinsing from './dokumentvinsing';
import Breadcrumbs from '../utils/brodsmulesti/customBreadcrumbs';

class DokumentVarsel extends React.Component {
    componentDidMount() {
        const { params, traader, lesDokumentVarsel, hentDokumentVisningData } = this.props;
        const traad = traader.find( (traad) => traad.traadId === params.id);
        if(traad && !traad.meldinger[0].lest) {
            lesDokumentVarsel(params.id);
        }
        if(traad && traad.meldinger[0]) {
            const varsel = traad.meldinger[0];
            hentDokumentVisningData(varsel.journalpostId, varsel.dokumentIdListe.join('-'));
        }
    }

    render() {
        if(!this.props.dokumentvisning) {
            return null;
        }
        const { params, routes } = this.props;

        return (
            <div className="dokinnsyn">
                <Breadcrumbs routes={routes} params={params} />
                <Dokumentvinsing { ...this.props.dokumentvisning } />
            </div>
        );
    }
}

const mapStateToProps = ({ traader, dokumentvisning  }) => ({ traader, dokumentvisning });
const mapDispatchToProps = (dispatch) => ({
    lesDokumentVarsel: (id) => dispatch(lesDokumentVarsel(id)),
    hentDokumentVisningData: (journalpostId, idListe) => dispatch(hentDokumentVisningData(journalpostId, idListe))
});

export default connect(mapStateToProps, mapDispatchToProps)(DokumentVarsel);
