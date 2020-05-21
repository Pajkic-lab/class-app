import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../actions.js/comment'

const Post = ({post, addComment}) => {
    const[formData, setFormData] = useState({
        switcher: false,
        comment: ''
    })

    const { comment, switcher } = formData 

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e =>{
        e.preventDefault()
        addComment({comment}, post._id)
        setFormData({ switcher: false, comment: '' })
    }

    return (
        <Fragment>
            <h2>{post.text}</h2> <br/>
            <span>{post.date}</span> <br/>
            <button onClick={()=>setFormData({ ...formData, switcher: !switcher })}>Write a comment</button> <br/>
            { switcher === false ? ('') : 
            <form onSubmit={onSubmit}>
                <input onChange={onChange} placeholder='write a comment' name='comment' value={comment} required /> <br/>
                <button>SUBMIT</button> <br/>
            </form> } 
            { post.comments && switcher=== true? 
              post.comments.map(coment=> 
                <div className='comment'>
                <span>commented by: {coment.name}</span> <br/>
                <h2>comment: {coment.text}</h2> <br/>
                <span>date: {coment.date}</span> <br/>
                </div>
                )  
              :  ('')
            }
             <hr/>
        </Fragment>
    )
}

export default connect(null, {addComment})(Post)
