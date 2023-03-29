import * as model from './model';
import recipeView from './views/recipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector(".recipe");

const controlRecipe = async function () {
  try {

    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id) return;

    recipeView.renderSpinner();
  
    // 1. Loading Recipe
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(err);
  }
};
controlRecipe();

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipe));
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
