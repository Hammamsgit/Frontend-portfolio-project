import React, { useState } from 'react';

function Collapse({children, on}) {
  
console.log(on, " from collapse")
    if(on){ return (
        <>
        {children}
            
        </>
    );
    }else { return (<></>)}
}

export default Collapse;