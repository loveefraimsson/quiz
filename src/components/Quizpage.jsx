import React, { useState, useEffect } from "react";

function Quizpage(props) {

    const [questions, setQuestions] = useState([]);


    useEffect(() => { 
        let allQuestions = props.questions;

        allQuestions.map((question, i) => {

            //Creates a new array from incorrect answers and also inserts the correct answer
            let alternatives = [...question.incorrect_answers];         
            alternatives.push(question.correct_answer);

            //Shuffles all alternatives so the correct answer isn't in the same place all the time
            const shuffle = (array) => { 
                return array.sort(() => Math.random() - 0.5); 
            };             
            const shuffledAlternatives = shuffle(alternatives); 
           
            question.alternatives = shuffledAlternatives;
            question.id = i;
        })

        setQuestions(allQuestions)

    }, [])

    


    return(
        <section className="quizContainer">


            
            {
                questions.map((question) => {
                    return(
                        <section className="questionContainer" key={question.id}>
                            <h2>{question.question}</h2>

                            {
                                question.alternatives.map((alternative) => {
                                    return (                                      
                                        <span className="alternative" key={alternative}>{alternative}</span>                    
                                    ) 
                                })
                            }

                        </section>
                    )          
                })
            }



        </section>
    )
}

export default Quizpage;
