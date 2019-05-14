import React from 'react';

function Attributes({attributes, emotionalScore, styles, infoClick}){
    emotionalScore = parseFloat(emotionalScore);
    return(
    <div className="attributes-all" onClick={() => {infoClick()} }>
        <div className="micstand" >
            <i className="fas fa-question mic"></i>
        </div>
        {/* <h2 style={styles}>Attributes: </h2>
        <h3 style={styles}>{attributes.emotions}</h3>
        <h3 style={styles}>{attributes.sentiments}</h3>
        <h4 style={styles}>{emotionalScore}</h4> */}
    </div>
    )
}
export default Attributes;