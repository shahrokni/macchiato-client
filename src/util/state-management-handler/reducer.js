import { combineReducers } from 'redux';
import {
    CHANGE_CURRENT_LOCATION,
    KEEP_CURRENT_COMPONENT,
    KEEP_USER_INFORMATION
} from './actions';

function changeCurrentLocation(state = '', action) {

    switch (action.type) {
        case CHANGE_CURRENT_LOCATION:
            return action.location;
        default:
            return state;
    }
}

function keepCurrentComponent(state = '', action) {

    switch (action.type) {
        case KEEP_CURRENT_COMPONENT:
            return action.component;
        default:
            return state;
    }
}

function keepUserInformation(state = '', action) {
    
    switch (action.type) {
        case KEEP_USER_INFORMATION:
            return action.currentUser;
        default:
            return state;
    }
}
const combinedReducers = combineReducers({
    location: changeCurrentLocation,
    currentComponent: keepCurrentComponent,
    currentUser: keepUserInformation
});
export default combinedReducers;