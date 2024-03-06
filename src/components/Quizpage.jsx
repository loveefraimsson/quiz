import React, { useState, useEffect } from "react";

function Quizpage(props) {

    const [questions, setQuestions] = useState([]);


    useEffect(() => {

        
        let allQuestions = props.questions;

       

        allQuestions.map((question) => {

            //Creates a new array from incorrect answers and also inserts the correct answer
            let alternatives = [...question.incorrect_answers];         
            alternatives.push(question.correct_answer);

            //Shuffles all alternatives so the correct answer isn't in the same place all the time
            const shuffle = (array) => { 
                return array.sort(() => Math.random() - 0.5); 
            };             
            const shuffledAlternatives = shuffle(alternatives); 
           
            question.alternatives = shuffledAlternatives;
        })

        setQuestions(allQuestions)

    }, [])

    


    return(
        <>
            <h2>Quizpage</h2>
        </>
    )
}

export default Quizpage;
