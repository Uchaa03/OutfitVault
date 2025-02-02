/**
 * @fileoverview Main entry point of the React application. This file renders
 * the root component (`App`) into the DOM using React's `createRoot` method.
 * The app is wrapped with `StrictMode` to activate additional checks and warnings
 * for potential issues in the app's component lifecycle.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

/**
 * Renders the root component (`App`) inside the DOM element with the ID `root`.
 * React's StrictMode is used to enable additional development checks.
 *
 * @function
 * @returns {void}
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
