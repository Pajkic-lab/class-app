import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { loadUser, logOut } from '../actions.js/auth'
import { createProfile, getProfile, getProfiles, deleteAccount } from '../actions.js/profile'
import UserList from './UserList'
import CreatePost from './post/CreatePost'
import PostList from './post/PostList'
import { getPosts } from '../actions.js/post'
import { getImage } from '../actions.js/image'

const Dashboard = (
    {loadUser, user, logOut, history, createProfile, profile,
         getProfile, getProfiles, deleteAccount, getPosts, getImage}
    ) => {
    const[formData, setFormData]= useState({
        bio: '',
        aboutme: '',
        switcher: true
    })

    const{ bio, aboutme, switcher } =formData

    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })

    const onSubmit = e => {
        e.preventDefault()
        createProfile({bio, aboutme})
        setFormData({ ...formData, bio:'', aboutme:'' })
    }

useEffect(()=>{
    loadUser()
    getProfile()
    getProfiles()
    getPosts()
    getImage()
    // eslint-disable-next-line
}, [])

    return (
        <Fragment>
            <h1>SAY SOMETHING NICE</h1>
        <div className='formdash'>
            { profile?
            <Fragment>
             <h1>{user && user.name} </h1>
             <h3> bio : {profile && profile.bio}</h3>
             <h3> about me : {profile && profile.aboutme}</h3>
             <button onClick={()=> setFormData({switcher: !switcher})}>EDIT</button> <br/> <br/>
             {switcher===true? ('') : (<>
             <h1>EDIT PROFILE</h1>
             <form onSubmit={onSubmit}>
             <input onChange={onChange} name='bio' placeholder='bio' value={bio} required /> <br/>
             <input onChange={onChange} name='aboutme' placeholder='about me' value={aboutme} required /> <br/>
             <button>SUBMIT</button> <br/> <br/>
             </form> 
             </>)}
             </Fragment> : 
            <Fragment>
                <h1>CREATE PROFILE</h1>
                <form onSubmit={onSubmit}>
                <input onChange={onChange} name='bio' placeholder='bio' value={bio} /> <br/>
                <input onChange={onChange} name='aboutme' placeholder='about me' value={aboutme} /> <br/>
                <button>SUBMIT</button> <br/> <br/>
                </form>
            </Fragment>
            } 
            {/*<Image />*/}
            <button onClick={()=>logOut({history})}>LogOut</button>
            <button onClick={()=>deleteAccount({history})}>Delete Account</button> <br/> <br/>
            <hr />
            <CreatePost />
            <PostList />
        </div>
        <UserList />
        </Fragment>
    )
}

const mapState = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    profile: state.profile.profile
})

export default connect(mapState,
     {loadUser, logOut, createProfile, getProfile, getProfiles, deleteAccount, getPosts, getImage}
     )(Dashboard)
