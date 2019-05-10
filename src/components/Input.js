import React from 'react';
function Input({text, handleChange, handleClick}){
    return(
        <div>
            

            <input 
            value={text}
            onChange={(e) => {
                handleChange(e.target.value);
            }}
            />
            <button onClick={() => {
                return (
                    handleClick() 
                    // setScore()
                )}}>
                Some text
            </button>
        </div>
    )
}
export default Input;