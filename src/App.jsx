import React, { useState, useEffect } from 'react';

import Startpage from './components/Startpage';
import Quizpage from './components/Quizpage';

import './App.css';

import { Base64 } from 'js-base64';



//Allt utom kategori
//'https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean'


//Allt inklusive kategori
//https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean


//Hämta alla kategorier
//https://opentdb.com/api_category.php

function App() {

  
  const [selectedCategory, setSelectedCategory] = useState({
    categoryName: '',
    id: 0
  });

  const [questions, setQuestions] = useState([]);
  const [gameinProgress, setGameInProgress] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);



  function selectCategoryFunction(event) {
    setSelectedCategory({
      categoryName: event.target.value,
      id: event.target.selectedOptions[0].id
    })
  }

  function handleStartQuizBtn() {
    fetch(`https://opentdb.com/api.php?amount=3&category=${selectedCategory.id}&difficulty=easy&type=multiple&encode=base64`)
    .then(res => res.json())
    .then((data) => {  
      
      setQuestions(data.results.map(item => {
        return({
          type: Base64.decode(item.type),
          difficulty: Base64.decode(item.difficulty),
          category: Base64.decode(item.category),
          question: Base64.decode(item.question),
          correct_answer: Base64.decode(item.correct_answer),
          incorrect_answers: item.incorrect_answers.map((incorrectAnswer => {
            return Base64.decode(incorrectAnswer);
          }))
        }) 
        
      }))

      setGameInProgress(true)

    })
  }


  function handleIsGameFinished() {
    setIsGameFinished(prevState => !prevState);
  }


  function playAgain() {
    setGameInProgress(prevState => !prevState);
  }


  return (
    <>
      <h1>It's quiz time!</h1>

      {
        gameinProgress ? 
        <><Quizpage 
            questions={questions} 
            isGameFinished={isGameFinished} 
            gameinProgress={gameinProgress}
            handleIsGameFinished={handleIsGameFinished} 
            playAgain={playAgain}/>
        </>
        : 
        <Startpage 
          selectCategoryFunction={selectCategoryFunction} 
          handleStartQuizBtn={handleStartQuizBtn} />
      }

      
    </>
  )
}

export default App
