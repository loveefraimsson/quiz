import React, { useState, useEffect } from "react";

function Question(props) {

    const [activeId, setActiveId] = useState('');

    if(props.isGameFinished) {
        //Mark the right answers in green color
        document.getElementById(props.question.correct_answer.replace(/[^a-zA-Z0-9]/g, '')).classList.add('correctAnswer');

        //Check if the selectedAlternative is in the array of incorrect_answers, if it is, give is the class incorrectAnswer
        if(props.question.incorrect_answers.includes(props.question.selectedAlternative)) {
            document.getElementById(props.question.selectedAlternative.replace(/[^a-zA-Z0-9]/g, '')).classList.add('incorrectAnswer');
        }
    }

    return (

        <section className="questionContainer">
            <p>{props.question.question}</p>

            {props.question.alternatives.map((alternative) => {

                let id = alternative.replace(/[^a-zA-Z0-9]/g, '');
                return (                                      
                    <span 
                        className={ `alternative ${activeId === id ? 'selectedAnswer' : '' }` }
                        key={alternative}
                        value={alternative}
                        id={id}
                        onClick={() =>{
                            props.handleAlternative(alternative, props.question.id);
                            setActiveId(id);
                        }}   
                        >  
                            {alternative}
                    </span>

                ) 
            })}

        </section>
    )


}

export default Question;
