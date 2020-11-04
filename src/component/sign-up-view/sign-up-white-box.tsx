import React from 'react';
import AppIntroducer from '../../entity/app-introducer/interface/IAppIntroducer';
import './css/sign-up-white-box.css';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import { ConditionsAgreement } from './sign-up-agree-contions';
import SimpleBtn from '../simple-btn/simple-btn';
import { RedDashedLink } from '../red-dashed-link/red-dashed-link';
/*----- I N T E R F A C E --------*/
export interface SignUpStaticInfo {
    appIntroducers: AppIntroducer[]
}
/*-------------------------------*/
export const SignUpWhiteBox = (signUpStaticInfo: SignUpStaticInfo): JSX.Element => {

    let signInBtnStyle = {
        size: '90%',
        marginTop: '10px',
        marginLeft: '5%',      
        textAlign: 'center',
        height: '8%'
    }

    if (!window.matchMedia('(max-width:767px)'))
        signInBtnStyle.height = 'auto';

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
            <div>
                <div className='signUpSelectControl'>
                    <Select id='signUpGender' variant="outlined" defaultValue={'Man'}>
                        <MenuItem value={'Man'}>Man</MenuItem>
                        <MenuItem value={'Woman'}>Woman</MenuItem>
                    </Select>
                </div>
                <div className='signUpSelectControl'>
                    <Select id='signUpProvince' variant="outlined" defaultValue={1}>
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
            <div className='signupRow'>
                <div>
                    <ConditionsAgreement />
                </div>
                <div className='signupAgreeText' style={{ fontFamily: 'Montserrat-Regular', color: '#707070' }}>
                    I agree with&nbsp;
                </div>
                <div style={{ display: 'flex' }}>
                    <RedDashedLink text='tems and conditions' href='/termofuse' marginTop='6%' marginLeft='' />
                </div>
            </div>
            <br />
            
                <SimpleBtn text={'Sign up'} secondryTheme={false} simpleStyle={signInBtnStyle} />
           
            <br />
            <div className='signupRow'>
                <div style={{ fontFamily: 'Montserrat-Regular', color: '#707070' }}>
                    Do you have an account?&nbsp;
                </div>
                <div>
                    <RedDashedLink text='Sign in' href='/signin' marginTop='3%' marginLeft='' />
                </div>
            </div>
        </div>
    );
}

