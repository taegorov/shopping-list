import axios from 'axios';
import { root } from '../helper';
require('dotenv').config();

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
        shoppingList: [...state.shoppingList, ...payload]
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

    case 'DELETE_ALL_ITEMS':
      return {
        ...state, shoppingList: []
      }

    default:
      return state;
  }
}


// // // === === ===  ACTIONS  === === === // // // 
export const getList = () => {
  const listItems = initialState.shoppingList;
  console.log('👾 initial state', listItems);
  // would it be useful to sort items by category in the future?
  // const response = products.filter(product => product.category === category);
  return listItems;
}


export const loadList = () => async (dispatch, getState) => {
  const { auth } = getState();
  console.log('AUTH USER TOKEN', auth.user)
  const response = await axios({
    method: 'get',
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
  const { REACT_APP_CX_KEY, REACT_APP_GOOGLE_API_KEY } = process.env;
  // // COMMENT BELOW OUT!!!!!!!!!!!!!!
  // console.log('IMPORTANT KEYS:', REACT_APP_CX_KEY, REACT_APP_GOOGLE_API_KEY)
  // ///////////////////////////////////////////////
  const { auth } = getState();
  const newItemsWithImage = await Promise.all(
    newItem.map(async (item) => {
      const googleInfo = await axios({
        method: 'get',
        url: `https://customsearch.googleapis.com/customsearch/v1?cx=${REACT_APP_CX_KEY}&key=${REACT_APP_GOOGLE_API_KEY}&num=1&q=${item.productName}`
      })
      console.log(googleInfo);
      return { ...item, image: googleInfo?.data?.items?.[0]?.pagemap?.cse_image?.[0]?.src }
    })
  )

  console.log(newItemsWithImage);

  const itemData = await axios({
    method: 'post',
    url: `${root}/listitem`,
    data: newItemsWithImage,
    headers: {
      authorization: `bearer ${auth.user.token}`
    }
  });
  console.log('ITEM DATA: ', itemData)
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


export const deleteAllItems = (userId) => async (dispatch, getState) => {
  console.log('DELETE ALL ITEMS', userId)
  const { auth } = getState();
  const itemData = await axios({
    method: 'delete',
    // url: `http://localhost:3001/listitem/${deleteId}`,
    url: `${root}/${userId}`,
    data: userId,
    headers: {
      authorization: `bearer ${auth.user.token}`
    }
  });
  if (!!itemData.data.success) {
    dispatch({
      type: 'DELETE_ALL_ITEMS',
      payload: { id: userId }
    });
  } else {
    console.log('Something went awry')
  }
};