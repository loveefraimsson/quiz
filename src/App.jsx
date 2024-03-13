import React, { useState, useEffect } from 'react';

import Startpage from './components/Startpage';
import Quizpage from './components/Quizpage';
import upperVector from './assets/upperVector.svg';
import lowerVector from './assets/lowerVector.svg';
import './App.css';

import { Base64 } from 'js-base64';


function App() {

  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedAmount, setSelectedAmount] =  useState('');
  const [errorMessageRunGame, setErrorMessageRunGame] = useState('');

  const [questions, setQuestions] = useState([]);
  const [gameinProgress, setGameInProgress] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);


  function selectFunction(event) {
    const {name, value, selectedOptions, valueAsNumber} = event.target
    
    switch (name) {
      case 'categories':
        setSelectedCategory({
          categoryName: value,
          id: selectedOptions[0].id
        });
        break;

      case 'difficulty':
        setSelectedDifficulty(value);
        break;

      case 'amount':
        setSelectedAmount(valueAsNumber);
        break;
    }
  }

  function handleStartQuizBtn() {

    if(selectedCategory && selectedDifficulty && selectedAmount) {
      fetch(`https://opentdb.com/api.php?amount=${selectedAmount}&category=${selectedCategory.id}&difficulty=${selectedDifficulty}&type=multiple&encode=base64`)
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
    } else {
      setErrorMessageRunGame('You must fill in all fields before starting the quiz!')
    }

    /*  */
  }


  function handleIsGameFinished() {
    setIsGameFinished(prevState => !prevState);
  }


  function playAgain() {
    setGameInProgress(prevState => !prevState);
    setIsGameFinished(prevState => !prevState);
    setSelectedCategory({});
    setSelectedDifficulty('');
    setSelectedAmount('');
    setQuestions([]);
  }


  return (
    <main>
      <img src={upperVector} alt="Vector" className='upperVector' />
      <h1>It's quiz time!</h1>

      {
        gameinProgress ? 
        <Quizpage 
            questions={questions} 
            isGameFinished={isGameFinished} 
            gameinProgress={gameinProgress}
            handleIsGameFinished={handleIsGameFinished} 
            playAgain={playAgain}
            selectedCategory={selectedCategory}
            selectedDifficulty={selectedDifficulty}
            selectedAmount={selectedAmount}
        />
        : 
        <Startpage 
          selectFunction={selectFunction} 
          handleStartQuizBtn={handleStartQuizBtn} 
          errorMessageRunGame={errorMessageRunGame}
        />
      }

      <img src={lowerVector} alt="Vector" className='lowerVector' />
    </main>
  )
}

export default App
