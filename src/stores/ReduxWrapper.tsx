import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore  from './index';

const {persistor, store} = configureStore(); 

export default ({ element }:any) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
                {element}
        </PersistGate>
    </Provider>
);