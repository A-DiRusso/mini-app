import React from 'react';
function Info({emotionalScore, attributes, styles2, whatYouHadSaid}){

    emotionalScore = parseFloat(emotionalScore);
    const saidX = 100/whatYouHadSaid.length + 10
    if(whatYouHadSaid.length > 20){
        whatYouHadSaid = 'Say less to me'
    }
    const emoX = 100/attributes.emotions[0].length + 10 
    const sentX = 100/attributes.sentiments[0].length + 10

    
    return(
        <div style={styles2}>
            {/* <svg style={{width: "200px;"}} src={("../imgs/img/quoteballon.svg")} alt={"bubble"}/> */}
            {/* <svg 
                viewBox="0  0  7000 7000"
                width="1000"
                height="1000"
            >
                    <text style={styles}>"{whatYouHadSaid}"</text>
                    <text style={styles}>{attributes.emotions}</text>
                    <text style={styles}>{attributes.sentiments}</text> */}
            {/* </svg> */}
            <svg viewBox="0 0 7000 7000">
             
                <image 
                    width="100%"
                    height="100%"
                    // width="7000"
                    // height="7000"
                    xlinkHref="../imgs/img/quoteballon.svg" 
                />
                {/* <use xlinkHref="./imgs/img/quoteballon.svg" style={{color: "black"}}></use> */}
                {/* <text x="20" y="35" style={{font: "italic 103px sans-serif"}}>My</text>
                <text x="40" y="35" style={{font: "bold 300px sans-serif"}}>cat</text>
            <text x="55" y="55" style={{font: "bold 30px sans-serif"}}>is</text> */}

                <g className="textgroup" 
                    
                >
                    <text 
                    
                    >
                        <tspan x={`${saidX}%`} y="40%">{whatYouHadSaid}</tspan><br />
                        <tspan x={`${emoX}%`} y="50%">{attributes.emotions}</tspan>
                        <tspan x={`${sentX}%`} y="60%">{attributes.sentiments}</tspan>
                    </text>
                </g>
            </svg>

            
        </div>
    )
}
export default Info;