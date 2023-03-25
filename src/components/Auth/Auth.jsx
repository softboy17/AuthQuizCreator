import React  from 'react';
import classes from '../Auth/Auth.css'
import "../Auth/Auth.css"
import { Component } from "react";
import Input from '../input/input';
import is from 'is_js'
import Select from "../Select/Select";
import Button from "bootstrap/js/src/button";

export default class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                    value: '',
                    type: 'email',
                    label: 'Email',
                    errorMessage: 'Введите корректный email',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        email: true
                    }
            },
            password: {
                value: '',
                    type: 'password',
                    label: 'Password',
                    errorMessage: 'Введите корректный password',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6,
                    }
            }
        }
    }
    
    loginHandler = () => {
        
    }
    registerHandler = () => {
        
    }
    submitHandler = event => {
        event.preventDefault()
    }
    validateControl(value, validation){
        if(!validation){
            return true
        }

        let isValid = true

        if (validation.required){
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email){
            isValid = is.email(value) && isValid
        }
        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }
    onChangeHandler = (event, controlName) => {
        console.log(`${controlName}:`, event.target.value)

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })


    }
    renderInputs(){
        return Object.keys(this.state.formControls).map((controlName, index) =>{
            const control = this.state.formControls[controlName]
            
            return (
                <Input
                key = {controlName + index}
                type = {control.type}
                value = {control.value}
                valid = {control.valid}
                touched = {control.touched}
                label = {control.label}
                shouldValidate = {!!control.validation}
                errorMessage = {control.errorMessage}
                onChange = {(event) => this.onChangeHandler(event, controlName)}
                />
                
                )
            })}


            render() {
                return (
                    <div className ={classes.Auth}>
                    <div className='input'>
                    <h1 style={{fontSize: '46px', textAlign: 'center'}}>Авторизация</h1>
        
                    <form onSubmit={this.submitHandler} className= {classes.AuthForm}>
                    {this.renderInputs()}
                
                    <button type='success' onClick={this.loginHandler} disabled = {!this.state.isFormValid} className = 'logIN'> Войти </button>
                    <button type='primary' onClick={this.registerHandler} disabled = {!this.state.isFormValid}  className = 'signUP'> Зарегистрироваться </button>
                    </form>
                    </div>
                    </div>
                    );
                }
            }