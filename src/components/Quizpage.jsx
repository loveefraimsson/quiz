import React, { useState, useEffect } from "react";
import Question from "./Question.jsx";

function Quizpage(props) {

    const [questions, setQuestions] = useState([]);
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState('');
    const [errorMessageClass, setErrorMessageClass] = useState('');

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


    //Sets the clicked alternative to question object in selectedAlternative
    function handleAlternative(answer, id) {
        setQuestions(prevQuestions => {
            return prevQuestions.map((question) => {
                return question.id === id ? {...question, selectedAlternative: answer} : question;
            })
        })     
    }
    


    function checkAnswers() {
        
        //Checks how many correct answers there is and sets to state and prints it out
        let counter = 0;
        let allQuestionsAnswered = questions.every(question => question.selectedAlternative);  
       
        if(allQuestionsAnswered) {
            questions.map((question) => {
                if(question.correct_answer === question.selectedAlternative) {
                    counter = counter + 1;
                } 
            }) 
            setCount(counter);
            setErrorMessageClass('');
            setMessage(`You scored ${counter}/10 answers`)
            props.handleIsGameFinished();
        } 
        else {
            setErrorMessageClass('errorMessage');
            setMessage('Answer all questions before checking the answers!');

        }        
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
                            isGameFinished={props.isGameFinished} 
                        />
                    )
                })            
            }


            {
                props.isGameFinished ? <button onClick={props.playAgain}>Play again</button> :
                <button onClick={checkAnswers}>Check answers</button>
            }
            
            
            <p id="message" className={`${errorMessageClass}`}>{message}</p>

        </section>
    )


}

export default Quizpage;
