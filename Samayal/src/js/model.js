import async from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

export const state ={
    recipe: {},
}

export const loadRecipe = async function(id){

    try {
    const data = await getJSON(`${API_URL}/${id}`);

    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      image_url: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      cooking_time: recipe.cooking_time,
      source_url: recipe.source_url,
      title: recipe.title,
    };

    console.log(recipe);

    } catch (err) {
       console.error('${err}} 💥💥💥');
    }
}