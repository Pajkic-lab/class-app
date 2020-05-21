import { GET_IMAGE } from "../actions.js/types"

const initState={
    image: null
}

export default function(state=initState, action){
    const{ type, payload } = action
    switch(type){
        case GET_IMAGE:
            return { ...state, image: payload }
        default: return state
    }
}