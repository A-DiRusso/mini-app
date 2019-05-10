import React from 'react';
function Input({handleClick, setScore}){
    return(
        <div>
            <input placeholder="blah">

            </input>
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