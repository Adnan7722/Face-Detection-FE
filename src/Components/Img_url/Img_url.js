import React from "react";


const Img_url=({onInputChange, onButtonSubmit})=>
{
    return(

        <div className="tc">
            <p className="f3">
             {'Face Detector!!'}
            </p>
        

        <input className="f4 pa1 w-40 ph1" type="text" onChange={onInputChange}/>
        <p>{" "}</p>
        <button className="w-10  grow f4 link  pv1 dib white bg-light-purple " onClick={onButtonSubmit} > DETECT</button>   
 
        </div>

        
        
        
    );
}


export default Img_url;