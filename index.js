import React from 'react';
import ReactDOM from 'react-dom';
import * as action from './action/index';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import allReducers from './reducer/index'
import App from './component/App'
import ReduxThunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';

let store=createStore(allReducers, composeWithDevTools(applyMiddleware(ReduxThunk)));
store.dispatch(action.AllData());
store.dispatch(action.stateData());
ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));
registerServiceWorker();
