import { CREATE_TODO, EDIT_TODO, DELETE_TODO } from './todoTypes'

const createTodo = (data) => {
    return {
        type: CREATE_TODO,
        payload: data
    }
}

const editTodo = (data) => {
    return {
        type: EDIT_TODO,
        payload: data
    }
}

const deleteTodo = (data) => {
    return {
        type: DELETE_TODO,
        payload: data
    }
}

export { createTodo, editTodo, deleteTodo }