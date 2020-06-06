import React from 'react';
import  './css/background.css';
import BackGround1 from '../../resource/image/background1.jpg'
export default class Background extends React.Component{

    render(){

        return(

            <div className='fullSize absolute' style={{ zIndex:-1, overflow:'hidden'}}>
                <img id = 'mainWallpaper' src={BackGround1} alt='background'/>                
            </div>

        );
    }
}