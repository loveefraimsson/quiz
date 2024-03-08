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

        // Antingen så måste du loopa igenom frågorna så att classen bara tas bort på den frågan som klicket gäller
        // Eller så får du göra på något annat sätt, kanske göra allt i Question component för då vet du vilken fråga som det gäller
        // Men du måste ta bort klassen innan den läggs till på ett annat alternativ så att inte två stycken alternativ kan vara valda samtidigt
        // Kanske att du kan jämföra med den som är valt i state


        //let answerId = answer.replace(/[^a-zA-Z0-9]/g, '');

        //document.querySelectorAll('.alternative').classList.remove('selectedAlternative');
        //console.log(document.querySelectorAll('.alternative')); //Denna hittas
        //document.getElementById(answerId).classList.add('selectedAlternative');

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
