import './polyfills';
import './index.less';
import './utils';
import * as React from 'react';
import MainApp from './mainapp';
import { render } from 'react-dom';
import setupMock from './mock/setup-mock';

const KjorMotDevProxy = true;

function erLocalhost() {
    const host: string = window.location.host;
    return host.includes('localhost') || host.includes('127.0.0.1');
}

if (erLocalhost() && !KjorMotDevProxy) {
    setupMock();
}

render(<MainApp/>, document.getElementById('app-root'));
