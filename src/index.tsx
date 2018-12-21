import 'babel-polyfill';

import './index.less';

import './utils';
import * as React from 'react';
import MainApp from './mainapp';
import { render } from 'react-dom';

render(<MainApp/>, document.getElementById('mainapp'));
