import React from 'react'
import {useState } from "react";

function Question(props) {

    const result = (
        <div>
            <input value="true" 
                name={`question${props.questionKey + 1}`} 
                type="radio"
                onChange={e=> props.checkQuestion(props.questionKey, e.target.value)}
            />
            <label>{props.question.result}</label>
        </div>
    )

    const choice1 = (
        <div>
            <input value="false" name={`question${props.questionKey + 1}`} type="radio"
                onChange={e=> props.checkQuestion(props.questionKey, e.target.value)}/>
            <label>{props.question.choice1}</label>
        </div>
    )

    const choice2 = (
        <div>
            <input value="false" name={`question${props.questionKey + 1}`} type="radio"
                onChange={e=> props.checkQuestion(props.questionKey, e.target.value)}/>
            <label>{props.question.choice2}</label>
        </div>
    )

    const choice3 = (
        <div>
            <input value="false" name={`question${props.questionKey + 1}`} type="radio"
                onChange={e=> props.checkQuestion(props.questionKey, e.target.value)}/>
            <label>{props.question.choice3}</label>
        </div>
    )
    
    const options = [result, choice1, choice2, choice3]
    const newOptions = []

    while (options.length > 0) {
        let randomPos = Math.floor(Math.random() * options.length);
        newOptions.push(options[randomPos]);
        options.splice(randomPos, 1);
    }

    return (
        <div>
            <h3>Câu hỏi {props.questionKey + 1}</h3>
            <div className="showQuestion">
                <p>{props.question.questionContent}</p>
                
                {newOptions.map((option) => {
                    return option;
                })}

            </div>
        </div>
    )
}

export default Question