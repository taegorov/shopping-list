import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import listItemReducer from './list.js';
import authReducer from './auth.js';


const reducers = combineReducers({
  shoppingList: listItemReducer,
  auth: authReducer,
})


const store = () => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
}

export default store;
