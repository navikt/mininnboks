import * as React from "react";
import { mount, configure } from "enzyme";
import { IntlProvider } from "react-intl";
// @ts-ignore
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

export function render(component: React.ReactNode) {
  return mount(<IntlProvider>{component}</IntlProvider>).first();
}
