import React, { useEffect, useState } from 'react';
import AppIntroducer from '../../entity/app-introducer/interface/IAppIntroducer';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import SimpleNarrowWaiting from '../simple-waiting/simple-waiting';
import IntroducerService from '../../service/introducer-service/introducer-service';
import IAppIntroducer from '../../entity/app-introducer/interface/IAppIntroducer';
import './css/introducer-selector.css';
/*----- I N T E R F A C E --------*/
export interface IIntroducerSelector {
    appIntroducers: AppIntroducer[]|null;
    isDisabled:boolean;
    changeEvent:any
}

export const IntroducerSelector = (introducerSelectorParam: IIntroducerSelector): any => {
    
    const [appIntroducers,setAppIntroducers] = useState<IAppIntroducer[]>([]);    
    if (introducerSelectorParam != null && introducerSelectorParam.appIntroducers != null && introducerSelectorParam.appIntroducers.length !== 0) {
        introducerSelectorParam.appIntroducers.map((item) => {
            setAppIntroducers([...appIntroducers,item]);
        })
    }

    useEffect(() => {
        //FETCH ALL INTRODUCERS FROM DATABASE
        if (appIntroducers.length === 0) {
            const introducerService = new IntroducerService();
            introducerService.getAllIntroducers()
                .then((result) => {
                    setAppIntroducers([...(result as IAppIntroducer[])]);
                })
        }
    });

    return (

        (appIntroducers.length !== 0) ? (
            <div className='introducerSelectorContainer'>
                <Select
                    defaultValue={'NONE'}
                    variant="outlined"
                    disabled = {introducerSelectorParam.isDisabled}
                    onChange={(e)=>{
                        introducerSelectorParam.changeEvent(e)
                    }}
                >
                    <MenuItem key={0} value={'NONE'}>{'No One!'}</MenuItem>
                    {appIntroducers.map((item, index) =>
                        <MenuItem key={index + 1} value={item.code}>{item.name}</MenuItem>
                    )}
                </Select>
            </div>) : <SimpleNarrowWaiting />
    )
}