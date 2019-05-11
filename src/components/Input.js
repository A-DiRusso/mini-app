import React from 'react';
function Input({text, handleChange, handleClick, styleInputs}){
    const styleHidden = {display:'none'};
    return(
        <div>
            
            <div id="content">
                <input style={styleHidden} id="subscriptionKey" type="text" value="3661985bbd5846aa9458b415d245168e" />
                <input style={styleHidden} id="serviceRegion" type="text" value="westus" />
                <i id="startRecognizeOnceAsyncButton" className="fas fa-microphone-alt"></i> 
            </div>


            <input 
                id="phraseDiv"
                value={text}
                onChange={(e) => {
                    handleChange(e.target.value);
                }}
            />
            <button style={styleInputs} onClick={() => {
                return (
                    handleClick() 
                )}}>
                Submit
            </button>
        </div>
    )
}
export default Input;
