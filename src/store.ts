import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

function getStoreCompose() {
    return compose(
        applyMiddleware(thunkMiddleware)
    );
}

export default function create() {
    const composed = getStoreCompose();

    return composed(createStore)(reducer, {});
}
