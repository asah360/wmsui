import {createStore , combineReducers , applyMiddleware} from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import asn_reducer from './AsnReducer';

const reducers = combineReducers({
    asn : asn_reducer
});
const middleware = applyMiddleware(promise,thunk,logger);

const store = createStore(reducers,1,middleware);

export default store;
