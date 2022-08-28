import { call, select, put, delay } from 'redux-saga/effects';
import Idx from 'idx';
import {showLoader, hideLoader} from '../actions/app.actions.types';
import { logout } from '../actions/user.actions.types';
import axiosInstance from '../utilities/axios.instance';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
import {RootState} from '../reducers';

function* HttpClient({payload, isLoader = true, authorization = true}:{
    payload:any,
    isLoader:boolean,
    authorization:boolean
}):any {
    if (isLoader) {
        yield put(showLoader());
        yield delay(250);
    }

    const data = { ...payload };
    if(authorization) {
        const authToken:RootState = yield select(({user: {token}})=> token);
        if(authToken){
            data.headers = { 'x-authorization': authToken};
        } else {
            yield put(hideLoader());
            return {
                error: true,
                result: null
            }
        }
    }

    try{
        const {
            data: result,
        } = yield call(axiosInstance, data);

        yield put(hideLoader());
        return {
            error: null,
            result,
        }
    }catch(error){
         yield put(hideLoader());

         if(Idx(error, (_) => _.code)) {
             if(error.code === 'ECONNABORTED') {
                 const message = 'Please try later our servers are not responding.';
                 store.addNotification({
                    title: 'Error',
                    message: message,
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn:  ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 2000,
                      onScreen: true,
                    }
                })
             } else if (error.code === 401){
                 yield delay(500);
                 yield put(logout());
             } else if (error.code === 402) {
                    
             } else {
                store.addNotification({
                    title: 'Error',
                    message: error.message,
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn:  ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 2000,
                      onScreen: true,
                    }
                })
             }
         }else{
            store.addNotification({
                title: 'Error',
                message: error.message,
                type: 'danger',
                insert: 'top',
                container: 'top-right',
                animationIn:  ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 2000,
                  onScreen: true,
                }
            })
         }
         return {
             error,
             result: null
         }
    }
}

export default HttpClient;