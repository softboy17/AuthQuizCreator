import React, {Component} from 'react';
import classes from './QuizCreactor.css';
import Input from '../input/input';
import Select from "../Select/Select";
import {validate, validateForm} from "../Select/fromFramework";

class QuizCreator extends Component {
    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: this.createFormControls()
    }

    submitHandler = event => {
        event.preventDefault()
    }


    createOptionControl(number) {
        return ({
            label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым',
            id: number
        }, {required: true})
    }

    createQuizHandler = event => {
        event.preventDefault()

        console.log(this.state.quiz)
    }

    createFormControls() {
        return {
            question: ({
                label: "Введите вопрос",
                errorMessage: 'Вопрос не может быть пустым'
            }, {required: true}),
            option1: this.createOptionControl(1),
            option2: this.createOptionControl(2),
            option3: this.createOptionControl(3),
            option4: this.createOptionControl(4)
        }
    }

    addQuestionHandler = () => {
        const quiz = this.state.quiz.concat()
        const index = quiz.length + 1

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }
        quiz.push(questionItem)

        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: this.createFormControls()
        })
    }
    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }



    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    label={control.label}
                    value={control.value}
                    key={index}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={(event) => this.changeHandler(event.target.value, controlName)}/>
            )

        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }


    render() {
        const mySelect = () => (<Select
                label="Выберите правильный ответ"
                value={this.state.rightAnswerId}
                onChange={this.selectChangeHandler}
                options={[
                    {text: 1, value: 1},
                    {text: 2, value: 2},
                    {text: 3, value: 3},
                    {text: 4, value: 4},

                ]}
            />
        )

        console.log(this.state);

        return (
            <div className={classes.QuizCreator}>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center'}}>
                    <h1 style={{textAlign: 'center'}}>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}
                        {mySelect()}
                    </form>
                    <div className='btn-block'>
                        <button type='primary' onClick={this.addQuestionHandler}
                                disabled={!this.state.isFormValid}>Добавить вопрос
                        </button>
                        <button type='success' onClick={this.createQuizHandler}
                                disabled={this.state.quiz.length === 0}>Создать тест
                        </button>
                    </div>
                </div>

            </div>
        )
    }
}

export default QuizCreator;
