import { PROFILE_CREATED, PROFILE_ERROR, GET_PROFILE, GET_PROFILES, CLEAR_PROFILE } from "../actions.js/types"

const initState = {
    profile: null,
    profiles: [],
    errors: {}
}

export default function(state= initState, action) {
    const { type, payload } = action

    switch(type) {
        case PROFILE_CREATED:
        case GET_PROFILE:
            return { ...state, profile: payload }
        case PROFILE_ERROR:
            return { ...state, profile: null, profiles: [], errors: payload}
        case GET_PROFILES:
            return { ...state, profiles: payload }
        case CLEAR_PROFILE:
            return { ...state, profile: null, profiles: [], errors: {} }
        default: return state
    }
}