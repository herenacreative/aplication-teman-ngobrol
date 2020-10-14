import {applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducers';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage : AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    applyMiddleware(promiseMiddleware, logger)
)

let persistor = persistStore(store);

export default {store, persistor}