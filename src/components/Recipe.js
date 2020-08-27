import React from 'react';
import style from './recipe.module.css';

const Recipe = ( { label, calories, image, ingredients }) => {

    return(
        <div className={style.recipe}>
            <h1 className={style.label}>{label}</h1>
            <ul className={style.ingredients}>
                {ingredients.map(ingredient => <li>{ingredient.text}</li>)}
            </ul>
            <p className={style.calories}>Calories: {calories.toFixed(2)}</p>
            <img className={style.image} src={image} alt="" />
        </div>
    );
}
export default Recipe;