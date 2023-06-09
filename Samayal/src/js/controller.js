import * as model from './model';
import recipeView from './views/recipeView';
import resultView from './views/resultView';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {

    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner();
  
    // 1. Loading Recipe
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
   recipeView.renderError();
  }
};

const controlSearchResults = async function(){
  try {

    resultView.renderSpinner();
    console.log(resultView);

    // 1) Get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
}


const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
