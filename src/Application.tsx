import * as React from 'react';
import  {useDispatch} from 'react-redux';
import {IntlProvider} from 'react-intl';

import Innholdslaster from './innholdslaster/Innholdslaster';
import Routes from './routes'
import { hentLedetekster } from './ducks/ledetekster';
import { useEffect } from 'react';
import { useAppState } from 'utils/custom-hooks';

import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/nb';

import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/nb';

function Application() {
    const dispatch = useDispatch();
    const ledetekster = useAppState((state) => state.ledetekster);
    useEffect(() => {
        dispatch(hentLedetekster());
    }, []);
    return (
        <IntlProvider defaultLocale="nb" locale="nb" messages={ledetekster.data}>
            <Innholdslaster avhengigheter={[ledetekster]}>
                <Routes/>
            </Innholdslaster>
        </IntlProvider>
    );
}
export default Application;
