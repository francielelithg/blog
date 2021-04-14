import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  publications: [],
  authors: [],
  selectedAuthor: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK':
      return { 
        ...state,
        authors: action.authors,
        selectedAuthor: action.selectedAuthor,
        publications: action.publications
      }
    default:
      return state
  }
}

const Store = createStore(reducer, applyMiddleware(thunk))

export default Store
