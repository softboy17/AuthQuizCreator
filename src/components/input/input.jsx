import React from 'react';
import '../input/input.css';
import classes from "../input/input.css"
function isInvalid(valid, touched, shouldValidate){
    return !valid && shouldValidate && touched
}

const Input = (props) => {
    const inputType = props.type || "text"
    const cls = [classes.Input]
    const htmlFor = `${inputType} - ${Math.random()}` 
    if(isInvalid()){
        cls.push(classes.invalid)
    }
    return (
        <div className={cls.join(' ')}>
        <div className='input'>
        <label htmlFor={htmlFor}>{props.label}</label>
        
        <input 
        type={inputType}
        id = {htmlFor}
        value = {props.value}
        onChange = {props.onChange}
        ></input>
        {
            isInvalid(props)
            ? <span>{props.errorMessage}</span>
            : null
        }
        </div>
        </div>
        );
    }
    
    export default Input;
    