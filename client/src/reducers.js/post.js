import { CREATE_POST, POST_ERROR, GET_POSTS, SET_CURRENT, CLEAR_CURRENT, CLEAR_POSTS } from "../actions.js/types"

const initState={
    posts: [],
    post: null,
    error: {},
    current: null
}

export default function(state=initState, action){
    const{ type, payload } = action

    switch(type){
        case CREATE_POST:
            return { ...state, posts: [...state.posts, payload] }
        case POST_ERROR:
            return { ...state, posts: [], post: null, error: {}, current: null }
        case GET_POSTS:
            return { ...state, posts: payload}
        case SET_CURRENT:
            return { ...state, current: payload}
        case CLEAR_CURRENT:
            return { ...state, current: null }
        case CLEAR_POSTS:
            return { ...state, posts: [] }
        default: return state
    }
}