import React from 'react'
import { connect } from 'react-redux'
import { deletePost, setCurrent } from '../../actions.js/post'

const PostList = ({posts, deletePost, setCurrent}) => {
    return (
        <div>
            { posts && posts.map(post=>{  return(
                  <div key={post._id} className='post'>
                      <span>POST :{post.text}</span> <br/>
                      <span>published: {post.date}</span> <br/>
                      <button onClick={()=>setCurrent(post._id, post.text)}>Edit</button>
                      <button onClick={()=>deletePost(post._id)}>Delete</button> <br/>
                      { post.comments && post.comments.map(ps =>
                      <> 
                      <div key={ps._id} className='comment'>
                          <h2>comment: {ps.text}</h2> <br/>
                          <span>commented by: {ps.name}</span> <br/>
                          <span>date: {ps.date}</span> <br/>
                      </div>
                      </>
                        )}
                      <hr/>
                  </div>
            )})}
        </div>
    )
}

const mapState = state => ({
    posts: state.post.posts
}) 

export default connect(mapState, {deletePost, setCurrent})(PostList)

