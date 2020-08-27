import React, { useState, useEffect } from 'react';

import './App.css';
import Recipe from './components/Recipe';
import Spinning from './components/Spinning.js';
import Pagination from './components/Pagination.js';

const App = () => {
  const [ recipes, setRecipes ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [ query, setQuery ] = useState('chicken');
  const [ loading, setLoading] = useState(true);
  const [ currentPage, setCurrentPage ] = useState(1);

  const firstItemIndex = (currentPage - 1) * 12;
  const lastItemIndex = firstItemIndex + 12;

  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;
  const APP_URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=84&calories=591-722&health=alcohol-free`;


  const loadData = async () => {
    const response = await fetch(APP_URL);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
    setCurrentPage(1);
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

  const updatePage = (page) => {
    setCurrentPage(page);
    scrollToTop();
  }

  const  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto"});
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
          recipes.slice(firstItemIndex, lastItemIndex).map((recipe, index) => 
            (<Recipe
              label ={recipe.recipe.label}
              calories = {recipe.recipe.calories}
              image = {recipe.recipe.image}
              ingredients = {[...recipe.recipe.ingredients]}
            />)
          )
        }
      </div>
      <Pagination
        page={currentPage}
        updatePage={(page) => updatePage(page)}
      />
    </div>
  );
}

export default App;
