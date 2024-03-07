const defaultState = {
  'todos': [],
}

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return {
        'todos': [
          ...state.todos,
          {
            'id': state.todos.length + 1,
            'text': action.payload.text,
            'completed': false,
          },
        ],
      }
    }

    case 'TOGGLE_TODO': {
      return {
        'todos': state.todos.map((todo) => {
          return todo.id === action.payload.id ? {
            ...todo,
            'completed': !todo.completed,
          } : todo
        }),
      }
    }

    default: {
      return state
    }
  }
}

export default todoReducer
