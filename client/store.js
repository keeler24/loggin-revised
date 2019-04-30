import { createStore, applyMiddleware, combineReducers } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'


const SAVE_LOGIN = "SAVE_LOGIN"

const saveLogin = (user) => {
  return {
    type: SAVE_LOGIN,
    user
  }
}

export const login = ({ email, password }) => {
  return (dispatch) => {
    return axios.post('/auth', { email, password })
      .then(resp => {
        dispatch(saveLogin(resp.data))
      })
  }
}

export const sessionLogin = () => {
  return (dispatch) => {
    return axios.get('/auth')
      .then(resp => {
        dispatch(saveLogin(resp.data))
      })
  }
}

export const logOut = () => dispatch => {
  return axios.delete('/auth')
    .then(resp => {
      dispatch(saveLogin({}))
    })

}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SAVE_LOGIN":
      return action.user
    default: return state
  }

}


const reducer = combineReducers({
  user: userReducer
});

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))
