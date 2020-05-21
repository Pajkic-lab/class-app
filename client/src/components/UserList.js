import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const UserList = ({ profiles, auth }) =>  {

    const profiless = profiles && profiles.filter(profile=> profile.user._id !== auth.user._id)

    return (
        <div className='userlist'>
            <Link to='/chatdashboard' ><h1 className='profile' >CHAT WITH PEOPLE</h1></Link>
            { profiless && profiless.map(profile=> { return (
                <div key={profile._id} className='profile' >
                   <Link to={'/profile/' + profile._id}>
                   <span>{profile.user.name}</span> <br/>
                   <span>bio: {profile.bio}</span> <br/>
                   <span>about me: {profile.aboutme}</span> <br/>
                   </Link>
                </div>
            )})}
        </div>
    )
}

const mapState = state => ({
    profiles: state.profile.profiles,
    auth: state.auth
})

export default connect(mapState)(UserList)
