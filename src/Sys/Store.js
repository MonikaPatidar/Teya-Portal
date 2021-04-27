import {createStore,applyMiddleware} from 'redux'
import  {persistStore}  from 'redux-persist';
import allReducers from '../Reducer' 
import thunk from 'redux-thunk';

export const store = createStore(allReducers,applyMiddleware(thunk));
export const persistor = persistStore(store);
 
export default {store, persistor}
