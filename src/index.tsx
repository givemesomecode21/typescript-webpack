import React from "react";
import { Provider } from "react-redux";
import { render } from 'react-dom';
import configureStore from "./store";
import { App } from "./web/App";
import { userService } from "@/services";
import { BrowserRouter, } from 'react-router-dom';

const store = configureStore();

userService.refreshToken().finally(startApp);

function startApp() {
  render(
    <Provider store={store}>
      <BrowserRouter  >
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}

