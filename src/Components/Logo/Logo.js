import React from "react";
import { Tilt } from 'react-tilt'



import FaceLogo from './FaceLogo.jpg'


const Logo=()=>
{
        return(
            <div className="flex justify-center items-center " >   

<div className="br-pill overflow-hidden ">
        <Tilt style={{ height: 200, width: 200 }}>
          <img alt='logo' src={FaceLogo} />
        </Tilt>
      </div>
            </div>
        );
}

export default Logo;