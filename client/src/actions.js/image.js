import axios from 'axios'
import { GET_IMAGE } from './types'

//upload photo
export const uploadPhoto = formData => async dispatch => {
    const config = {headers: { Accept: 'application/json', 'content-type': 'multipart/form-data' }}
    try {
        const res = await axios.post('/photo', formData, config)
        dispatch({
            type: GET_IMAGE,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
    }
}

//get image
export const getImage = () => async dispatch => {
    try {
        const res = await axios.get('/image')
        dispatch({
            type: GET_IMAGE,
            payload: res.data
        })
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}