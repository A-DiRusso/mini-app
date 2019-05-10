import React from 'react';
function Input({handleClick}){
    return(
        <div>
            <input>

            </input>
            <button onClick={() => handleClick()}>
                Some text
            </button>
        </div>
    )
}
export default Input;