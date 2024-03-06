import React, { useState, useEffect } from "react";

function Question(props) {

    return (


        <section className="questionContainer">
            <p>{props.question.question}</p>


            {props.question.alternatives.map((alternative) => {
                return (                                      
                    <span 
                        className="alternative" 
                        key={alternative}
                        value={alternative}
                        id={alternative}
                        onClick={() =>{
                            props.handleAlternative(alternative, question.id)
                        }}>
                            {alternative}
                    </span>

                ) 
            })}





        </section>
    )
}

export default Question;
