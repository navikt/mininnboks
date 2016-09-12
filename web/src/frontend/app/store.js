import DevTools from './devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import { erDev } from './utils';
import { routerMiddleware } from 'react-router-redux';

function getDebugSessionKey() {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
}

function getDevStoreCompose(history) {
    return compose(
        applyMiddleware(thunkMiddleware, routerMiddleware(history)),
        DevTools.instrument(),
        persistState(getDebugSessionKey())
    );
}

function getStoreCompose(history) {
    return compose(
        applyMiddleware(thunkMiddleware, routerMiddleware(history))
    );
}

export default function create(history) {
    const composed = erDev() ? getDevStoreCompose(history) : getStoreCompose(history);

    return composed(createStore)(reducer, {});
}
