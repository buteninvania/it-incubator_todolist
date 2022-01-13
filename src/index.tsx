import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './nullstyle.css'
import AppWitchReducer from './AppWitchReducer';

ReactDOM.render(
    <App /> /* ---> SPA using local state (useState)*/
    /*<AppWitchReducer/>*/ /* ---> SPA using reducers as state (useReducer)*/ ,  document.getElementById('root'));

serviceWorker.unregister();
