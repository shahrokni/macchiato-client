import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
export const ConditionsAgreement = ():JSX.Element=>{
    return (
        <React.Fragment>
            <Checkbox            
            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
            />           
        </React.Fragment>
    );
}