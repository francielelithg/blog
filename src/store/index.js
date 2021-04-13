import { applyMiddleware, createStore } from 'redux'

const initialState = {
  publications: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK':
      return { 
        ...state, 
        publications: action.publications
      }
    default:
      return state
  }
}

export const Store = createStore(reducer, applyMiddleware(thunk))
