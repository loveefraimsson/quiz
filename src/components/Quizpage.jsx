import React, { useState, useEffect } from "react";
import Question from "./Question.jsx";

function Quizpage(props) {

    const [questions, setQuestions] = useState([]);
    const [isGameFinished, setIsGameFinished] = useState(false)

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


    }

    //Om dom är olika: när button klickas skickas isGameFinished ner true till question component. Den i sin tur sätter klasser på rätt och fel svar och stylar därefter. Quizpage component loopas igenom frågorna och jämför selectedAnswer mot coorrect_answer för att se om det är rätt, och håller räkningen på det.

    //Tillsammans: När button klickas, man loopas igenom för att kolla vilka alternativ som är rätt, lägger alternativet


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

        </section>
    )
}

export default Quizpage;
