import React, { useState, useEffect } from "react";

function Question(props) {

    const [activeId, setActiveId] = useState('');

    if(props.isGameFinished) {

        //MARKERA DOM RÄTTA SVAREN MED GRÖN FÄRG
        document.getElementById(props.question.correct_answer.replace(/[^a-zA-Z0-9]/g, '')).classList.add('correctAnswer');

        //KOLLA OM  SELECTEDALTERNATIVE ÄR MED I ARRAYEN INCORRECT_ANSWER, ÄR DEN DET SÅ GE CLASSEN INCORRECTANSWER
        if(props.question.incorrect_answers.includes(props.question.selectedAlternative)) {
            document.getElementById(props.question.selectedAlternative.replace(/[^a-zA-Z0-9]/g, '')).classList.add('incorrectAnswer')
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
