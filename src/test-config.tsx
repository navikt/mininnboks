import * as React from 'react';
import { mount, configure } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export function render(component: React.ReactNode) {
    return mount(<>{component}</>).first();
}
