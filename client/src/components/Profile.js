import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { loadUser } from '../actions.js/auth'
import { getProfiles } from '../actions.js/profile'
import { Link } from 'react-router-dom'
import { getAllPosts, clearPosts } from '../actions.js/post'
import Post from './post/Post'

const Profile = ({loadUser, getProfiles, match, profiles, getAllPosts, posts, clearPosts }) => {

    useEffect(()=>{
        loadUser()
        getProfiles()
        getAllPosts()
        // eslint-disable-next-line
    }, [])
    
    //match dolazi iz propsa ( props.match.params )
    const id = match.params.profile_id
    const profile = profiles.filter(profile=> profile._id === id)

    const ids = profile.map(pr=> pr.user._id)
    const idss = ids[0]
    const postss = posts.filter(post=> post.user === idss)

    return (
        <Fragment>
        <Link onClick={()=>clearPosts()} to='/dashboard'><h2>DASHBOARD</h2></Link>
        <div className='form'>
            {profile && profile.map(pr=>{return(
                <Fragment key={pr._id}>
                    <h1>{pr.user.name}</h1>
                    <span> biograpgy: {pr.bio}</span> <br/>
                    <span> about me: {pr.aboutme}</span>
                </Fragment>
            )})}
        </div>

        <div className='form'>
            { postss && postss.map(post =>{return(
                <Post key={post._id} post={post} />
            )}) }
        </div>
        </Fragment>
    )
}

const mapState = state => ({
    profiles: state.profile.profiles,
    posts: state.post.posts
})

export default connect(mapState, {loadUser, getProfiles, getAllPosts, clearPosts})(Profile)
