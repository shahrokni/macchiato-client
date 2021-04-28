import React from 'react';
import { MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { Province } from '../../entity/global/province';
import './css/province.css';
export interface IProvinceComponent {
    id: string,
    defaultValue: string,
    isDisabled: boolean,
    onChange: any
}

export const ProvinceComponent = (provinceComponent: IProvinceComponent): JSX.Element => {
    return (

        <div className={'provinceComponentContainer'}>
            <Select id={provinceComponent.id} variant="outlined"
                defaultValue={provinceComponent.defaultValue}
                disabled={provinceComponent.isDisabled}
                onChange={(e) => {
                    provinceComponent.onChange(String(e.target.value))
                }}
            >
                <MenuItem value={Province.Tehran}>{Province.Tehran}</MenuItem>
                <MenuItem value={Province.Khuzestan}>{Province.Khuzestan}</MenuItem>
                <MenuItem value={Province.Fars}>{Province.Fars}</MenuItem>
                <MenuItem value={Province.Isfahan}>{Province.Isfahan}</MenuItem>
                <MenuItem value={Province.Semnan}>{Province.Semnan}</MenuItem>
                <MenuItem value={Province.EastAzarbaijan}>{Province.EastAzarbaijan}</MenuItem>
                <MenuItem value={Province.WestAzarbaijan}>{Province.WestAzarbaijan}</MenuItem>
                <MenuItem value={Province.Ardabil}>{Province.Ardabil}</MenuItem>
                <MenuItem value={Province.Gilan}>{Province.Gilan}</MenuItem>
                <MenuItem value={Province.Zanjan}>{Province.Zanjan}</MenuItem>
                <MenuItem value={Province.Kurdistan}>{Province.Kurdistan}</MenuItem>
                <MenuItem value={Province.Kermanshah}>{Province.Kermanshah}</MenuItem>
                <MenuItem value={Province.Hamedan}>{Province.Hamedan}</MenuItem>
                <MenuItem value={Province.Qazvin}>{Province.Qazvin}</MenuItem>
                <MenuItem value={Province.Alborz}>{Province.Alborz}</MenuItem>
                <MenuItem value={Province.Mazanderan}>{Province.Mazanderan}</MenuItem>
                <MenuItem value={Province.Markazi}>{Province.Markazi}</MenuItem>
                <MenuItem value={Province.Qom}>{Province.Qom}</MenuItem>
                <MenuItem value={Province.Lorestan}>{Province.Lorestan}</MenuItem>
                <MenuItem value={Province.Chaharmahal}>{Province.Chaharmahal}</MenuItem>
                <MenuItem value={Province.Kohgiluyeh}>{Province.Kohgiluyeh}</MenuItem>
                <MenuItem value={Province.Bushehr}>{Province.Bushehr}</MenuItem>
                <MenuItem value={Province.Hormozgan}>{Province.Hormozgan}</MenuItem>
                <MenuItem value={Province.Kerman}>{Province.Kerman}</MenuItem>
                <MenuItem value={Province.SouthKhorasan}>{Province.SouthKhorasan}</MenuItem>
                <MenuItem value={Province.RazaviKhorsan}>{Province.RazaviKhorsan}</MenuItem>
                <MenuItem value={Province.NorthKhorasan}>{Province.NorthKhorasan}</MenuItem>
                <MenuItem value={Province.Golestan}>{Province.Golestan}</MenuItem>
                <MenuItem value={Province.SistanBaluchestan}>{Province.SistanBaluchestan}</MenuItem>
                <MenuItem value={Province.Ilam}>{Province.Ilam}</MenuItem>
            </Select>
        </div>
    );

}