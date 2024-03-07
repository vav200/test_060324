import { createStore } from 'redux'
import todoReducer from './todo-reducer'

const store = createStore(todoReducer)

export { store }
