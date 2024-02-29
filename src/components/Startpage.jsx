import React, {useState, useEffect} from "react";

function Startpage(props) {

    const [allCategories, setAllCategories] = useState([]);
    

    //Fetches all categories
    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
        .then(res => res.json())
        .then((data) => {           
            setAllCategories(data.trivia_categories);
        })
    }, [])


    return(
        <>
            <select 
                name="categories" 
                id="category-select"
                onChange={props.selectCategory}
            >
                <option value="">Please choose an option</option>
            {
                allCategories.map((category) => {
                    return <option value={category.name}key={category.id}>{category.name}</option>
                })
            }
            </select>
            <button onClick={props.handleStartQuizBtn}>Start Quiz</button>
        </>
    )
}

export default Startpage;