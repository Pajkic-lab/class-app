import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, LOG_OUT, DELETE_ACCOUNT } from "../actions.js/types"

const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null
}

export default function(state= initState, action) {
    const {type, payload} = action

    switch(type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {...state, ...payload, isAuthenticated: true}
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOG_OUT:
            localStorage.removeItem('token')
            return {...state, token: null, isAuthenticated: null, user: null}
        case USER_LOADED:
            return {...state, user: payload, isAuthenticated: true}
        case DELETE_ACCOUNT:
            localStorage.removeItem('token')
            return { ...state, token: null, isAuthenticated: null, user: null}
        default: return state
    }
}