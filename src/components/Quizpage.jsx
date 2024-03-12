import React, { useState, useEffect } from "react";
import Question from "./Question.jsx";
import { nanoid } from 'nanoid'

function Quizpage(props) {

    const [questions, setQuestions] = useState([]);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [count, setCount] = useState(0);

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
        setQuestions(prevQuestions => {
            return prevQuestions.map((question) => {
                return question.id === id ? {...question, selectedAlternative: answer} : question;
            })
        })     
    }
    


    function checkAnswers() {
        setIsGameFinished(true);

        //Checks how many correct answers there is and sets to state
        let counter = 0;
        questions.map((question) => {
            if(question.correct_answer === question.selectedAlternative) {
                counter = counter + 1;
            } 
        })   
        setCount(counter);



    }

    return(
        <section className="quizContainer">
            
            {
                questions.map((question, i) => {
                    return (
                        <Question 
                            question={question} 
                            key={i} 
                            handleAlternative={handleAlternative}
                            isGameFinished={isGameFinished} 
                        />
                    )
                })            
            }

            <button onClick={checkAnswers}>Check answers</button>
            
            {isGameFinished ? <p>You scored {count}/10 answers</p> : null}

        </section>
    )


}

export default Quizpage;
