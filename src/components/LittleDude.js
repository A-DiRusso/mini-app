import React from 'react';
function LittleDude({emotionalScore}){
    emotionalScore = parseFloat(emotionalScore);
    console.log(emotionalScore);
    let emotion = '';
    if(emotionalScore < 0){
        emotion = `./imgs/angry-loop.gif`;
    }
    else if(emotionalScore > 0.3){
        emotion = `./imgs/happy-loop.gif`;
    }
    else{
        emotion = `./imgs/neutral-loop.gif`;
    }
    return(
        <div className="pictureframe">
            <img style={{width:"200px"}} src={`${emotion}`} ></img>
        </div>
    )
}
export default LittleDude;