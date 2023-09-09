import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { Provider } from 'react-redux';

import './index.css';
import App from "./App";
import store from './state/store';
import ToggleColorModeProvider from './utils/ToggleColorMode';

const root = createRoot(document.getElementById("root"));
const theme = createTheme({});

root.render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorModeProvider>
  </Provider>
);
