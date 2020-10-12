import PT from 'prop-types';
import * as React from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import {connect, useDispatch} from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import Innholdslaster from './innholdslaster/Innholdslaster';
import Routes from './routes'
import { hentLedetekster } from './ducks/ledetekster';
import {AppState} from "./reducer";
import { useEffect } from 'react';

addLocaleData(nb);

interface Props {
    ledetekster: string[]
}
function Application(props: Props){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(hentLedetekster());

    }, [])

        const { ledetekster = {} } = props;
        return (
            <IntlProvider defaultLocale="nb" locale="nb" messages={ledetekster.data} >
                <Innholdslaster avhengigheter={[ledetekster]}>
                    <Routes/>
                </Innholdslaster>
            </IntlProvider>
        );
}

Application.propTypes = {
    actions: PT.shape({
        hentLedetekster: PT.func
    }).isRequired,
    ledetekster: PT.object
};

const mapStateToProps = ({ ledetekster } : AppState) => ({ ledetekster });
const mapDispatchToProps = (dispatch : Dispatch) => ({ actions: bindActionCreators({ hentLedetekster }, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Application);
