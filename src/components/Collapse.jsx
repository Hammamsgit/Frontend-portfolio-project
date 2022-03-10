import React, { useState } from 'react';

function Collapse({children},{on}) {
    const [visible,setVisbility]= useState(false);
    if(on){setVisbility((current)=>!current)}
        
    
    return (
        <>
        {visible&&children}
            
        </>
    );
}

export default Collapse;