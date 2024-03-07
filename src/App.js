import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './store'
import TodoList from './todo-list'

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1 className="name">Todo App</h1>
        <TodoList />
      </div>
    </Provider>
  )
}

export default App
