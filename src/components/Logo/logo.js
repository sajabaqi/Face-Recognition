import React from 'react';
import Tilt from 'react-parallax-tilt';
import './logo.css';
import brain from './brain.png';


const Logo =() => {
    return (
        <div className='ma4 mt0'>
        <Tilt className='Tilt br2  shadow-2' options={{max: 75}} style={{height: 150, width: 150}}>
            <div>
                <img alt='logo' style={{paddingTop: '24px'}} src={brain} />
            </div>
        </Tilt>

        </div>
    );
}

export default Logo;