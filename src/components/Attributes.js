import React from 'react';

function Attributes({attributes, emotionalScore}){
    emotionalScore = parseFloat(emotionalScore);
    return(
    <div>
        <h2>Attributes: </h2>
        <h3>{attributes.emotions}</h3>
        <h3>{attributes.sentiments}</h3>
        <h4>{emotionalScore}</h4>
    </div>
    )
}
export default Attributes;