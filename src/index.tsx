import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './nullstyle.css'
import AppWitchRedux from './AppWitchRedux';
import {Provider} from 'react-redux';
import {store} from './state/store-redux';

ReactDOM.render(  /*<App /> */                                           /* ---> SPA using local state (useState)*/
                  /*<AppWitchReducer/>*/                                 /* ---> SPA using reducers as state (useReducer)*/
                    <Provider store={store}><AppWitchRedux/></Provider>, /*  ---> SPA using reducers as state control (useDispatch && useSelector)*/
         document.getElementById('root'));

serviceWorker.unregister();
