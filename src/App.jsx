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

  
  const [selectedCategory, setSelectedCategory] = useState('');

  function selectCategory(event) {
    console.log(event.target.value);
    setSelectedCategory(event.target.value);
  }

  function handleStartQuizBtn(event) {
    console.log(event);
  }
  

  return (
    <>
      <h1>It's quiz time!</h1>
      <Startpage selectCategory={selectCategory} handleStartQuizBtn={handleStartQuizBtn} />
    </>
  )
}

export default App
