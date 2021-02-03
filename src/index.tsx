import './polyfills';
import './index.less';
import './utils';
import * as React from 'react';
import MainApp from './mainapp';
import { render } from 'react-dom';
import Modal from 'nav-frontend-modal';

Modal.setAppElement('body');

if (process.env.REACT_APP_MOCK_ENABLED === 'true') {
    require('./mock');
}

render(<MainApp />, document.getElementById('app-root'));
