import * as React from 'react';
import  {useDispatch} from 'react-redux';
import {IntlProvider} from 'react-intl';
import Innholdslaster from './innholdslaster/Innholdslaster';
import Routes from './routes'
import { hentLedetekster } from './ducks/ledetekster';
import { useEffect } from 'react';
import { useAppState } from './utils/custom-hooks';
import { harData } from './avhengigheter';

import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/nb';

import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/nb';

function Application() {
    const dispatch = useDispatch();
    const ledeteksterResource = useAppState((state) => state.ledetekster);
    const ledetekster = harData(ledeteksterResource) ? ledeteksterResource.data : {};
    useEffect(() => {
        dispatch(hentLedetekster());
    }, []);

    return (
        <IntlProvider defaultLocale="nb" locale="nb" messages={ledetekster}>
            <Innholdslaster avhengigheter={[ledeteksterResource]}>
                <Routes/>
            </Innholdslaster>
        </IntlProvider>
    );
}
export default Application;
