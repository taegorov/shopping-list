import axios from 'axios';
import { root } from '../helper'

const initialState = {
  user: null
}

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        user: payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}

export const login = (username, password) => async (dispatch, getState) => {
  console.log('username and pw: ', username, password)
  // const response = await axios.post('http://localhost:3001/listitem', { username, password })
  // console.log('user login:', response);
  const authString = `${username}:${password}`
  const response = await axios({
    method: 'post',
    url: 'http://localhost:3001/signin',
    url: `${root}/signin`,
    headers: {
      authorization: `basic ${btoa(authString)}`
    }
  })
  console.log('response', response)
  dispatch({
    type: 'LOGIN',
    payload: response.data.data.user
  })
  return true;
}

//add localstorage set for login
