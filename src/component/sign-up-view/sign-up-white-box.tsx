import React from 'react';
import AppIntroducer from '../../entity/app-introducer/interface/IAppIntroducer';
import './css/sign-up-white-box.css';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import {SignUpConditionsLink} from './sign-up-conditions-link';
import {ConditionsAgreement} from './sign-up-agree-contions';
import SimpleBtn from '../simple-btn/simple-btn';
import {SignInLink} from './sign-in-link';
/*----- I N T E R F A C E --------*/
export interface SignUpStaticInfo {
    appIntroducers: AppIntroducer[] 
}
/*-------------------------------*/
export const SignUpWhiteBox = (signUpStaticInfo: SignUpStaticInfo): JSX.Element => {
    return (
        <div className='signUpWhitBoxContainer'>
            <TextField
                id='signUpName'
                label='Name'
                variant='outlined'
            />
            <TextField
                id='signUpLastName'
                label='Last name'
                variant='outlined'
            />
            <TextField
                id='signUpUserName'
                label='Username'
                variant='outlined'
            />
            <div >
                <div>
                    <Select id='signUpGender'>
                        <MenuItem value={'Man'}>Man</MenuItem>
                        <MenuItem value={'Woman'}>Woman</MenuItem>
                    </Select>
                </div>
                <div>
                    <Select>
                        <MenuItem value={1}>Tehran</MenuItem>
                        <MenuItem value={2}>Khuzestan</MenuItem>
                        <MenuItem value={3}>Fars</MenuItem>
                        <MenuItem value={4}>Isfahan</MenuItem>
                        <MenuItem value={5}>Semnan</MenuItem>
                        <MenuItem value={6}>East Azarbaijan</MenuItem>
                        <MenuItem value={7}>West Azarbaijan</MenuItem>
                        <MenuItem value={8}>Ardabil</MenuItem>
                        <MenuItem value={9}>Gilan</MenuItem>
                        <MenuItem value={10}>Zanjan</MenuItem>
                        <MenuItem value={11}>Kurdistan</MenuItem>
                        <MenuItem value={12}>Kermanshah</MenuItem>
                        <MenuItem value={13}>Hamedan</MenuItem>
                        <MenuItem value={14}>Qazvin</MenuItem>
                        <MenuItem value={15}>Alborz</MenuItem>
                        <MenuItem value={16}>Mazandaran</MenuItem>
                        <MenuItem value={17}>Markazi</MenuItem>
                        <MenuItem value={18}>Qom</MenuItem>
                        <MenuItem value={19}>Lorestan</MenuItem>
                        <MenuItem value={20}>Chaharmahal</MenuItem>
                        <MenuItem value={21}>Kohgiluyeh</MenuItem>
                        <MenuItem value={22}>Bushehr</MenuItem>
                        <MenuItem value={23}>Hormozgan</MenuItem>
                        <MenuItem value={24}>Kerman</MenuItem>
                        <MenuItem value={25}>South Khorasan</MenuItem>
                        <MenuItem value={26}>Razavi Khorsan</MenuItem>
                        <MenuItem value={27}>North Khorasan</MenuItem>
                        <MenuItem value={28}>Golestan</MenuItem>
                        <MenuItem value={29}>Sistan Baluchestan</MenuItem>
                        <MenuItem value={30}>Ilam</MenuItem>
                    </Select>
                </div>
            </div>
            <TextField
                id='signUpPassword'
                label='Password'
                variant='outlined'
                type='password'
            />
            <TextField
                id='signUpRepeatPassword'
                label='Repeat password'
                variant='outlined'
                type='password'
            />
            <div>
                <div>
                    <ConditionsAgreement/>
                </div>
                <div>
                    I agree with
                </div>
                <div>
                    <SignUpConditionsLink/>
                </div>
            </div>
            <SimpleBtn text={'Sign up'} secondryTheme={false}/>
            <div>
                <div>
                    Do you have an account?
                </div>
                <div>
                    <SignInLink/>
                </div>
            </div>
        </div>
    );
}

