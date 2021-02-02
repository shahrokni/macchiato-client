import React from 'react';
import { MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import {Gender} from '../../entity/user/gender';

export interface IGenderComponent {
    id: string,
    defaultValue: string,
    isDisabled: boolean,
    onChange: any
}

export const GenderComponent = (genderComponent:IGenderComponent):JSX.Element =>{
    return (
        <Select id={genderComponent.id}
        variant="outlined"
        defaultValue={genderComponent.defaultValue }
        disabled={genderComponent.isDisabled}
        onChange={(e) => {
            genderComponent.onChange(String(e.target.value))
        }}
    >
        <MenuItem value={Gender[Gender.Male]}>Male</MenuItem>
        <MenuItem value={Gender[Gender.Female]}>Female</MenuItem>
    </Select>
    );
}