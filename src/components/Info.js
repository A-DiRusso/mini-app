import React from 'react';
function Info({emotionalScore, attributes, styles, whatYouHadSaid}){
    emotionalScore = parseFloat(emotionalScore);
    return(
        <div>
        <h3 style={styles}>"{whatYouHadSaid}"</h3>
        <h3 style={styles}>{attributes.emotions}</h3>
        <h3 style={styles}>{attributes.sentiments}</h3>
        {/* <h4 style={styles}>{emotionalScore}</h4> */}
        </div>
    )
}
export default Info;