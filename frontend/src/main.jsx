import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx'
import AppProviders from './AppProviders.jsx';

const root = document.getElementById("root");
const rootElement = createRoot(root);

rootElement.render(
  <StrictMode>
    <BrowserRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>
  </StrictMode>
);

