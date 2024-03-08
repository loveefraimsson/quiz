import React, { useState, useEffect } from "react";

function Question(props) {

    const [activeId, setActiveId] = useState('');

    return (

        <section className="questionContainer">
            <p>{props.question.question}</p>


            {props.question.alternatives.map((alternative) => {
                return (                                      
                    <span 
                        className={ `alternative ${activeId === alternative.replace(/[^a-zA-Z0-9]/g, '') ? 'selectedAnswer' : '' } ` }
                        key={alternative}
                        value={alternative}
                        id={alternative.replace(/[^a-zA-Z0-9]/g, '')}
                        onClick={() =>{
                            props.handleAlternative(alternative, props.question.id);
                            setActiveId(alternative.replace(/[^a-zA-Z0-9]/g, ''));
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
