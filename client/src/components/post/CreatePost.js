import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addPost, clearCurrent, updatePost } from '../../actions.js/post'

const CreatePost = ({addPost, current, clearCurrent, updatePost}) => {
    const[formData, setFormData] = useState({
        text: ''
    })

    const{ text } = formData

    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })

    const onSubmit = e => {
        e.preventDefault()
        if(current === null) {
            addPost({text})
            setFormData({ text:''})
        } else {
            updatePost({text}, current.id)
            clearCurrent()
        }
    }

    useEffect(()=>{
        if (current !== null) {
            setFormData({
                ...formData, text: current.text
            }) 
        } else {
            setFormData({
                text:''
            })
        }
        // eslint-disable-next-line
    }, [current])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>CREATE POST</h2>
                <input onChange={onChange} placeholder='say somthing' value={text} name='text' /> <br/>
                <button>SUBMIT</button>
            </form>
            <hr/>
        </div>
    )
}

const mapState = state => ({
    current: state.post.current
})

export default connect(mapState, {addPost, clearCurrent, updatePost})(CreatePost)