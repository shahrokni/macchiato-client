import React from 'react';
import AppIntroducer from '../../entity/app-introducer/interface/IAppIntroducer';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
/*----- I N T E R F A C E --------*/
export interface IIntroducerSelector {
    appIntroducers: AppIntroducer[]
}

export const IntroducerSelector = (introducerSelector: IIntroducerSelector): any => {
    const createMenuItems = (introducers: AppIntroducer[]): any => {
        let menueItems: any[] = [];
        menueItems.push(<MenuItem value={'NONE'}>NONE</MenuItem>);

        for (let i = 0; i < introducers.length; i++) {
            const item = (<MenuItem value={introducers[i].code}>{introducers[i].name}</MenuItem>);
            menueItems.push(item);
        }
    }
    return (

        <Select defaultValue={'NONE'} variant="outlined">
            {createMenuItems(introducerSelector.appIntroducers)}
        </Select>
    )
}