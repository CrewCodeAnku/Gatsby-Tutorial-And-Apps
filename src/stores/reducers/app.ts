import {HIDE_LOADER, SHOW_LOADER} from '../actions/app.actions.types';

const initialState = {
    type: 'loader',
    visible: false
}

export interface appState {
    type: string,
    visible: boolean
}

export default function app(state = initialState,{payload, type}:any) {
    switch (type) {
        case HIDE_LOADER:
            return {
                type: payload || 'loader',
                visible: false,
            }

        case SHOW_LOADER:
            return {
                type: payload || 'loader',
                visible : true
            }
        
        default:
            return state;
    }
}