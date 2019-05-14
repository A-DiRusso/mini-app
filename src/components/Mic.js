import React from 'react';
import annyang from "annyang";

function Mic({setText, style}){
    return(
        <div className="micstandall" 
        // onMouseOver={() => showMeTheMoney()}
        >
            <div >
            <div style={style} className="micstand" onClick={()=>{ talkToMe()}} >
            <i id="startRecognizeOnceAsyncButton" className="fas fa-microphone-alt mic"></i>
            </div>
            </div>
            <p data-target className="hidden-text">Say anything</p>
        </div>
    )
    function showMeTheMoney(){
        const hiddenFigures = document.querySelector('[data-target]');
        hiddenFigures.classList.toggle('hidden-text')
    }
    function talkToMe(){
        var commands = {
            'bonjour': () =>  { 
            this.setState({
            text : "yo mamma"
            })
            alert('Bonjour monde!'); 
        },
        'hello': function() { alert('Hello world!'); }
        };
    
        // Add our commands to annyang
        annyang.addCommands(commands);
    
        // Start listening.
        annyang.start({
        autoRestart : false,
        continuous : false,
        });
        annyang.addCallback('resultNoMatch', (userSaid) =>{
            console.log("userSaid: ", userSaid[0]);
            setText(userSaid[0])
        })
    }
}
export default Mic;
