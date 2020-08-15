import { CREATE_USER, EDIT_USER, DELETE_USER } from './userTypes'

const createUser = (data) => {
    return {
        type: CREATE_USER,
        payload: data
    }
}

const editUser = (data) => {
    return {
        type: EDIT_USER,
        payload: data
    }
}

const deleteUser = (data) => {
    return {
        type: DELETE_USER,
        payload: data
    }
}

export { createUser, editUser, deleteUser }