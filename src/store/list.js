import axios from 'axios';
// require('dotenv').config();

const initialState = {
  shoppingList: [],
}


export default function listItemReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOAD_LIST_ITEMS':
      return {
        ...state,
        shoppingList: payload,
      }
    case 'ADD_LIST_ITEM':
      return {
        ...state,
        shoppingList: [...state.shoppingList, payload]
      }
    default:
      return state;
  }
}

export const getList = () => {
  const listItems = initialState.shoppingList;
  console.log('👾 initial state', listItems);
  // would it be useful to sort items by category in the future?
  // const response = products.filter(product => product.category === category);
  return listItems;
}

export const loadList = () => async (dispatch, getState) => {
  // const response = await axios.get('http://localhost:3001/listitem')
  const { auth } = getState();
  const response = await axios({
    method: 'get',
    url: 'http://localhost:3001/listitem',
    headers: {
      authorization: `bearer ${auth.user.token}`
    }
  })
  console.log('🌶 response.data', response.data.data);
  dispatch({
    type: 'LOAD_LIST_ITEMS',
    payload: response.data.data
  })
}

export const addItem = () => async (dispatch, getState) => {
  const random = parseInt(Math.random() * 10);
  const newItem = {
    id: random,
    productName: "Product " + random,
    quantity: random,
    category: "Category " + random,
  };
  // const response = await axios.post('http://localhost:3001/listitem')
  // console.log('response data for POST: ', response.data.data)
  dispatch({
    type: 'ADD_LIST_ITEM',
    payload: newItem,
  });
  // setDataSource((existingItems) => {
  //   return [...existingItems, newItem];
  // });
};