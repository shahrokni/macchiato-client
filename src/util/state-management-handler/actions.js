//Action Types
export const CHANGE_CURRENT_LOCATION='CHANGE_CURRENT_LOCATION';
export const KEEP_CURRENT_COMPONENT = 'KEEP_CURRENT_COMPONENT';

//Action creators
export function changeCurrentLocation(location){
    return{type:CHANGE_CURRENT_LOCATION,location: location};
}

export function keepCurrentComponent(component){
    return {type:KEEP_CURRENT_COMPONENT, component:component};
}