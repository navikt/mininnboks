import * as React from "react";
import { Provider } from "react-redux";
import createStore from "./store";
import Application from "./Application";

const store = createStore();

export default function MainApp() {
  return (
    <Provider store={store}>
      <Application />
    </Provider>
  );
}
