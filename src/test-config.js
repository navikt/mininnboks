import React from 'react';
import { mount, configure } from 'enzyme';
import { IntlProvider } from 'react-intl';

import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

export function render(component) {
    return mount(<IntlProvider>{component}</IntlProvider>).first();
}