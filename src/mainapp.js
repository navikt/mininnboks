import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';
import createStore from './store';
import {Provider} from 'react-redux';
import Application from './application';

const store = createStore(history);


export default function MainApp() {
    return (
        <Provider store={store}>
            <Application/>
        </Provider>
    );
}
