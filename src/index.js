import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import './index.scss';
import AppWithData from './App';
import DataProvider from './components/Provider';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <DataProvider>
    <BrowserRouter>
      <AppWithData />
    </BrowserRouter>
  </DataProvider>,
document.getElementById('root'));
registerServiceWorker();
