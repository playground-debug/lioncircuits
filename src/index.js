import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ReactStrictMode = <React.StrictMode>
  <App />
</React.StrictMode>

export const rootElement = document.getElementById('root')

ReactDOM.render(
  ReactStrictMode,
  rootElement
);
