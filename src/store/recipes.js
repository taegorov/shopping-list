// import axios from 'axios';
// import { root } from '../helper';
require('dotenv').config();

const initialState = {
  recipes: ['pizza'],
}


export default function recipesReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case 'LOAD_RECIPES':
      return {
        ...state,
        recipes: payload,
      };
    default:
      return state;
  }
}