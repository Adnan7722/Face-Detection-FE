import React from "react";

const   Navigation=({isSignedIn , onRouteChange})=>
{

        if(isSignedIn)
       {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'} } >
            <p onClick = {()=>onRouteChange('signout')} className='tr right black f3 link dim moon-gray  pa2 pointer'>Sign-Out</p>  

            </nav>  
        );
       }  
         else
         {
            return(
                <nav className="flex justify-end items-center ">       
                <p onClick = {()=>onRouteChange('signin')}className='tr right moon-gray f3 link dim   pa2 pointer'>Sign-In</p>  
            <p onClick = {()=>onRouteChange('register')}className='tr right moon-gray  f3 link dim   pa2 pointer'>Register</p>  

       

    </nav> 
            ) 


       }



 
}

export default Navigation;