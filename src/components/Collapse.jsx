import React from 'react';

function Collapse({children, on}) {
  
    if(on){ return (
        <>
        {children}
            
        </>
    );
    }else { return (<></>)}
}

export default Collapse;