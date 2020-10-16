import * as React from 'react';
import createStore from './store';
import {Provider} from 'react-redux';
import Application from "./Application";

const store = createStore();

export default function MainApp() {
    return (
        <Provider store={store}>
            <Application/>
        </Provider>
    );
}
