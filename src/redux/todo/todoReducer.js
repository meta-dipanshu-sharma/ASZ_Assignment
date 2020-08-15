import { CREATE_TODO, EDIT_TODO, DELETE_TODO } from './todoTypes'

const initialState = {
    todos: []
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TODO: return {
            ...state,
            todos: [...state.todos, action.payload]
        }

        case EDIT_TODO: {
            const index = state.todos.findIndex(todo => action.payload.key === todo.key)
            state.todos[index] = action.payload;
            return {
                ...state,
                todos: [...state.todos]
            }
        }

        case DELETE_TODO: return {
            todos: [...state.todos.filter(todo => todo !== action.payload)]
        }

        default: return state
    }
}

export default todoReducer