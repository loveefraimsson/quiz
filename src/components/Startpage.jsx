import React, {useState, useEffect} from "react"

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
        <section className="startpageContainer">
            <section>

            
                <h1>It's quiz time!</h1>
                <select name="categories" id='categoriesSelect'onChange={props.selectFunction}>
                    <option value="">Please choose an category</option>
                {
                    allCategories.map((category) => {
                        return <option id={category.id} value={category.name} key={category.id}>{category.name}</option>
                    })
                }
                </select> <br />

                <select name="difficulty" id="difficultySelect" onChange={props.selectFunction}>
                    <option value="">Please choose a difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select> <br />

                <input type="number" name="amount" onChange={props.selectFunction} placeholder="Please insert the amount of questions" /> <br />


                <button className="button" onClick={props.handleStartQuizBtn}>Start Quiz</button>

                <p className="errorMessage">{props.errorMessageRunGame}</p>
            </section>
            
        </section>
    )
}

export default Startpage;
