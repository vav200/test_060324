import React, { useEffect, useState } from 'react'
import './todo-list.css'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, toggleTodo } from './actions'
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

const TodoList = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)
  const [inputState, setInputState] = useState(true)
  const [nameAdd, setNameAdd] = useState('')
  const [filter, setFilter] = useState('all')
  const [completedCount, setCompletedCount] = useState(0)
  const [unfinishedCount, setUnfinishedCount] = useState(0)
  const [allCount, setAllCount] = useState(0)
  const numSimbols = 10

  useEffect(() => {
    const completedTodos = todos.filter((todo) => todo.completed)
    const unfinishedTodos = todos.filter((todo) => !todo.completed)
    setCompletedCount(completedTodos.length)
    setUnfinishedCount(unfinishedTodos.length)
    setAllCount(todos.length)
  }, [todos])

  const filterTodos = todos.filter((todo) => {
    if (filter === 'all') return true
    if (filter === 'completed') return todo.completed
    if (filter === 'unfinished') return !todo.completed
    return true
  })

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  const handleAddTodo = () => {
    if (nameAdd) {
      dispatch(addTodo(nameAdd))
      setNameAdd('')
    }
  }

  function maxSimbols(event) {
    if (event.target.value.length > numSimbols) {
      setInputState(false)
    } else {
      setInputState(true)
      setNameAdd(event.target.value)
    }
  }

  return (
    <div className="main">
      <div className="enterBox">
        <TextField
          className="textfield"
          id={inputState ? 'standard-basic' : 'standard-error-helper-text'}
          label={inputState ? 'Name todo' : 'Error'}
          variant="standard"
          onChange={maxSimbols}
          {...(inputState ? {} : { 'error': true })}
          value={nameAdd}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleAddTodo}
          {...(inputState ? {} : { 'disabled': true })}
        >
          Add
        </Button>
      </div>

      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Filter</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={handleChange}
          defaultValue="all"
        >
          <FormControlLabel
            value="all"
            control={<Radio />}
            label={`all todos ( ${allCount} )`}
          />
          <FormControlLabel
            value="completed"
            control={<Radio />}
            label={`completed ( ${completedCount} )`}
          />
          <FormControlLabel
            value="unfinished"
            control={<Radio />}
            label={`unfinished ( ${unfinishedCount} )`}
          />
        </RadioGroup>
      </FormControl>

      <List className="todosList">
        {filterTodos.map((todo) => {
          const textDecoration = todo.completed ? 'line-through' : 'none'
          return (
            <ListItem
              button
              key={todo.id}
              style={{ textDecoration }}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              <ListItemIcon>{todo.id}</ListItemIcon>
              <ListItemText primary={todo.text} />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default TodoList
