import React, { useState, useEffect } from "react";
import Question from "./Question.jsx";

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
            question.selectedAlternative = '';
        })

        setQuestions(allQuestions);

    }, [])


    function handleAlternative(answer, id) {
        console.log(answer);
        console.log(id);

        setQuestions(prevQuestions => {
            return prevQuestions.map((question) => {
                return question.id === id ? {...question, selectedAlternative: answer} : question;
            })
        })
        
    }
    


    return(
        <section className="quizContainer">
            
            {
                questions.map((question, i) => {
                   return <Question question={question} key={i} handleAlternative={handleAlternative} />
                })            
            }



        </section>
    )
}

export default Quizpage;
