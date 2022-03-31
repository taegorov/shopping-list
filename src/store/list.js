import axios from 'axios';
import { root } from '../helper';
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
      };

    case 'ADD_LIST_ITEM':
      return {
        ...state,
        shoppingList: [...state.shoppingList, payload]
      };

    case 'UPDATE_LIST_ITEM':
      const newList = state.shoppingList.map(lineItem => {
        if (lineItem.id === payload.id) {
          return { ...lineItem, ...payload }
        }
        return lineItem
      })
      return {
        ...state,
        shoppingList: newList
      };

    case 'DELETE_LIST_ITEM':
      return {
        ...state, shoppingList: state.shoppingList.filter(lineItem => lineItem.id !== payload.id)
      }

    default:
      return state;
  }
}



// // // === === === === === === === === === === // // //
// // // === === ===  ACTIONS BELOW  === === === // // // 
// // // === === === === === === === === === === // // //
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
    // url: 'http://localhost:3001/listitem',
    url: `${root}/listitem`,
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

export const addItem = (newItem) => async (dispatch, getState) => {
  const { auth } = getState();
  const itemData = await axios({
    method: 'post',
    // url: `http://localhost:3001/listitem`,
    url: `${root}/listitem`,
    data: newItem,
    headers: {
      authorization: `bearer ${auth.user.token}`
    }
  });
  // console.log('ITEM DATA: ', itemData)
  if (!!itemData.data.success) {
    dispatch({
      type: 'ADD_LIST_ITEM',
      payload: itemData.data.data,
    });
  } else {
    console.log('Something went awry')
  }
};


export const updateItem = (update, updateId) => async (dispatch, getState) => {
  console.log('PUT LINE ITEM', update, updateId)
  const { auth } = getState();
  const itemData = await axios({
    method: 'put',
    // url: `http://localhost:3001/listitem/${updateId}`,
    url: `${root}/listitem/${updateId}`,
    data: update,
    headers: {
      authorization: `bearer ${auth.user.token}`
    }
  });
  if (!!itemData.data.success) {
    dispatch({
      type: 'UPDATE_LIST_ITEM',
      payload: { ...update, id: updateId }
    });
  } else {
    console.log('Something went awry')
  }
};

export const deleteItem = (deleteId) => async (dispatch, getState) => {
  console.log('DELETE LINE ITEM', deleteId)
  const { auth } = getState();
  const itemData = await axios({
    method: 'delete',
    // url: `http://localhost:3001/listitem/${deleteId}`,
    url: `${root}/listitem/${deleteId}`,
    data: deleteId,
    headers: {
      authorization: `bearer ${auth.user.token}`
    }
  });
  if (!!itemData.data.success) {
    dispatch({
      type: 'DELETE_LIST_ITEM',
      payload: { id: deleteId }
    });
  } else {
    console.log('Something went awry')
  }
};
