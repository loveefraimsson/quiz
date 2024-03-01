import React, { useState, useEffect } from 'react';

import Startpage from './components/Startpage';

import './App.css'



//Allt utom kategori
//'https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean'


//Allt inklusive kategori
//https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean


//Hämta alla kategorier
//https://opentdb.com/api_category.php

function App() {

  
  const [selectedCategory, setSelectedCategory] = useState({
    categoryName: '',
    id: 0,
    questions: []
  });

  function selectCategoryFunction(event) {
    setSelectedCategory({
      categoryName: event.target.value,
      id: event.target.selectedOptions[0].id,
      questions: [],
    })
  }

  function handleStartQuizBtn() {
    fetch(`https://opentdb.com/api.php?amount=3&category=${selectedCategory.id}&difficulty=easy&type=multiple`)
    .then(res => res.json())
    .then((data) => {  
      console.log(data);
      setSelectedCategory(prevState => {
        return {
          ...prevState,
          questions: data.results
        }

      })
    })
  }
  

  return (
    <>
      <h1>It's quiz time!</h1>
      <Startpage selectCategoryFunction={selectCategoryFunction} handleStartQuizBtn={handleStartQuizBtn} />
    </>
  )
}

export default App
