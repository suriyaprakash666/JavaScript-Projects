import { API_URL } from './config';
import { getJSON } from './helpers';

export const state ={
    recipe: {},
    search: {
      query: '',
      results: [],
    },
};

export const loadRecipe = async function(id){

    try {
    const data = await getJSON(`${API_URL}${id}`);

    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      image_url: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      cooking_time: recipe.cooking_time,
      source_url: recipe.source_url,
    };

    console.log(state.recipe);

    } catch (err) {
       console.error(`${err} 💥💥💥`);
       throw err;
    }
}

export const loadSearchResults = async function( query ){
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results =  data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      }
    });
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
}

loadSearchResults();