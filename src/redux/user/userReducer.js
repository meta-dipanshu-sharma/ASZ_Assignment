import { CREATE_USER, EDIT_USER, DELETE_USER } from './userTypes'

const initialState = {
    users: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER: return {
            ...state,
            users: [...state.users, action.payload]
        }

        case EDIT_USER: {
            const index = state.users.findIndex(user => action.payload.key === user.key)
            state.users[index] = action.payload;
            return {
                ...state,
                users: [...state.users]
            }
        }

        case DELETE_USER: return {
            users: [...state.users.filter(user => user !== action.payload)]
        }

        default: return state
    }
}

export default userReducer