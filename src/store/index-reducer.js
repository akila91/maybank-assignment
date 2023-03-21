import { combineReducers } from 'redux'

import todosReducer from './todos/reducers'

const IndexReducer = combineReducers({
    todosReducer
});

export default IndexReducer