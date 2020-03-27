import PT from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import Innholdslaster from './innholdslaster/innholdslaster';
import Routes from './routes'
import { hentLedetekster } from './ducks/ledetekster';
import { harTilgangTilKommunaleTemagrupper } from "./ducks/tilgang";

addLocaleData(nb);

class Application extends React.Component {
    componentWillMount() {
        this.props.actions.hentLedetekster();
        this.props.actions.harTilgangTilKommunaleTemagrupper();
    }

    render() {
        const { ledetekster = {} } = this.props;

        return (
            <IntlProvider defaultLocale="nb" locale="nb" messages={ledetekster.data} >
                <Innholdslaster avhengigheter={[ledetekster]}>
                    <Routes/>
                </Innholdslaster>
            </IntlProvider>
        );
    }
}

Application.propTypes = {
    actions: PT.shape({
        hentLedetekster: PT.func
    }).isRequired,
    ledetekster: PT.object
};

const mapStateToProps = ({ ledetekster }) => ({ ledetekster });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators({ hentLedetekster, harTilgangTilKommunaleTemagrupper }, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Application);
