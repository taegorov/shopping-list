import cookie from 'react-cookies';
import axios from 'axios';
import { root } from '../helper'
import { decodeJwt } from 'jose'


// const initialState = {
//   user: null,
//   isAuthenticated: false,
// }

console.log('root is', process.env)

const checkForToken = () => {
  const token = cookie.load('shoppingListLogin');
  console.log(token, 'access_token')

  if (!token) {
    return {
      user: {},
      isAuthenticated: false
    };
  }

  const decoded = decodeJwt(token);
  console.log(decoded, 'decoded')

  // const decoded = jwt.decode(access_token);
  return { user: { ...decoded, token }, isAuthenticated: true };
};

// console.log(checkForToken(), 'checking for tken');

const initialState = checkForToken();


export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
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
    // url: 'http://localhost:3001/signin',
    url: `${root}/signin`,
    headers: {
      authorization: `basic ${btoa(authString)}`
    }
  })
  console.log('LOGIN response', response)
  console.log('token', response.data.data.token)
  cookie.save('shoppingListLogin', response.data.data.token)
  dispatch({
    type: 'LOGIN',
    payload: response.data.data.user
  })
  return true;
}
