import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import auth from './auth';
import signup from './Signupuser';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] // which reducer want to store
  };

const allReducers = combineReducers({
    authUser: auth,
    SignUp:signup
})

export default persistReducer(persistConfig,allReducers);