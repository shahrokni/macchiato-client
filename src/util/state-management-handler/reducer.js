import {combineReducers } from 'redux';
import {CHANGE_CURRENT_LOCATION,KEEP_CURRENT_COMPONENT} from './actions';

function changeCurrentLocation(state='',action){

    switch(action.type){
        case CHANGE_CURRENT_LOCATION:
            return action.location
            default:
                return state;
    }    
}

function keepCurrentComponent(state='',action){
    switch(action.type){
        case KEEP_CURRENT_COMPONENT:
            return action.component
            default:
                return state;
    }
}

const combinedReducers = combineReducers({location:changeCurrentLocation,
    currentComponent:keepCurrentComponent});
export default combinedReducers;