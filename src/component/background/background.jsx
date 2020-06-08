import React from 'react';
import './css/background.css';
import BackGround1 from '../../resource/image/background1.jpg';
import Background2 from '../../resource/image/background2.jpg';

export default class Background extends React.Component {

    constructor(props) {

        super(props);

        const backgroundObject = this;
        this.state = { orientaion: window.orientation};

        window.addEventListener("orientationchange", function () {
            //It changes the background image accordingly. 
            backgroundObject.setState({orientaion:window.orientation});
        });
    }
    render() {


        return (

            <div className='fullSize absolute' style={{ zIndex: -1, overflow: 'hidden' }}>
                <img id='mainWallpaper' src={this.handleBackgroundImage()} alt='background' />
            </div>

        );
    }

    handleBackgroundImage() {
      
        let background = undefined;
        let mediaQuery =
            window.matchMedia('only screen and (max-width:767px) and (orientation: portrait)');
      
        if (mediaQuery.matches === true) {
           
            background = Background2;
        }
        else {
            
            background = BackGround1;
        }
        
        return background;
    }
}