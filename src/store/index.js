import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import listItemReducer from './list.js';
import authReducer from './auth.js';
import recipesReducer from './recipes.js';


const reducers = combineReducers({
  shoppingList: listItemReducer,
  auth: authReducer,
  recipes: recipesReducer,
})


const store = () => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
}

export default store;
