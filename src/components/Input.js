import React from 'react';
function Input({text, handleChange, handleClick, styleInputs}){
    return(
        <div>
            

            <input 
            value={text}
            onChange={(e) => {
                handleChange(e.target.value);
            }}
            />
            <button style={styleInputs} onClick={() => {
                return (
                    handleClick() 
                    // setScore()
                )}}>
                Submit
            </button>
        </div>
    )
}
export default Input;