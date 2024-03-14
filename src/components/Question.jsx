import React, { useState, useEffect } from "react";

function Question(props) {

    const [activeId, setActiveId] = useState('');

    if(props.isGameFinished) {
        //Mark the right answers in green color
        document.getElementById(props.question.correct_answer.split(" ").join("")).classList.add('correctAnswer');

        //Check if the selectedAlternative is in the array of incorrect_answers, if it is, give is the class incorrectAnswer
        if(props.question.incorrect_answers.includes(props.question.selectedAlternative)) {
            document.getElementById(props.question.selectedAlternative.split(" ").join("")).classList.add('incorrectAnswer');
        }
    }

    return (
        <>
            <section className="questionContainer">
                <p className="question">{props.question.question}</p>

                <section className="alternativeSection">
                {props.question.alternatives.map((alternative) => {

                    let id = alternative.split(" ").join("");
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

            </section>

            <hr />
        </>
    )


}

export default Question;
