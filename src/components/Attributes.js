import React from 'react';
function Attributes({attributes}){
    console.log(attributes);
    return(
    <div>
        <h2>Attributes: </h2>
        <h3>{attributes.emotions}</h3>
        <h3>{attributes.sentiments}</h3>
    </div>
    )
}
export default Attributes;