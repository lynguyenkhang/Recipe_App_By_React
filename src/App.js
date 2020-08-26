import React, { useState, useEffect } from 'react';
import './App.css';
import Recipe from './Recipe';
import Spinning from './components/Spinning.js';

const App = () => {
  const [ recipes, setRecipes ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [ query, setQuery ] = useState('chicken');
  const [ loading, setLoading] = useState(true);

  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;
  const APP_URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12&calories=591-722&health=alcohol-free`;


  const loadData = async () => {
    const response = await fetch(APP_URL);
    const data = await response.json();
    setRecipes(data.hits);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  },[query])

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    // prevent a browser reload/refresh.
    e.preventDefault();
    setLoading(true);
    setQuery(search); 
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}>
        </input>
        <button className="search-button" type="submit">Search</button>
      </form>
      { loading && <Spinning />}
      <div className="recipes">
        {
          recipes.map((recipe) => (
            <Recipe
              label ={recipe.recipe.label}
              calories = {recipe.recipe.calories}
              image = {recipe.recipe.image}
              ingredients = {[...recipe.recipe.ingredients]}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
