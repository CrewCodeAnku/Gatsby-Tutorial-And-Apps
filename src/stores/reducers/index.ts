import { persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
//import storage from './persist-storage';
import app from './app';
import product from './product';
import encryptor from './encryptor';
//import {connectRouter } from "connected-react-router"
import createCompressor from "redux-persist-transform-compress";
import { StateType } from 'typesafe-actions';

const compressor = createCompressor();
const config = {
    blacklist: ['app', 'network', 'toast'],
    key: 'primary',
    storage,
    transforms:<any>[encryptor, compressor]
}

const rootReducer = combineReducers({
  app:app,
  product:product
});

export type RootState = StateType<typeof rootReducer>

const reducers = () => persistReducer(
    config
   ,rootReducer
  );

export default reducers;
