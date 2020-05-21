import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { loadUser } from '../../actions.js/auth'
import { v4 as uuidv4 } from 'uuid'



const ChatDashboard = ({loadUser, user}) => {
    const[formData, setFormData]= useState({
        text:'',
        poruke: []
    })

    const { text, poruke } = formData
    const { name } = user

    const ENDPIONT = 'localhost:5000'
    const socket = io(ENDPIONT)

    useEffect(()=>{
        loadUser()
        //sending message to server
        //socket.emit('join', {name})

        //reciving message from server
        //socket.on('svima', text=> console.log(text))

        //sending to evry user exept yourself
        //socket.emit('sendChatMessage', {name})

        //reciving message from server/another user
        //socket.on('chatMessage', text=> console.log(text))


        return()=>{
            socket.emit('disconnect')
            socket.off()
        }
        // eslint-disable-next-line
    }, [])

    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })

    const onSubmit = e =>{
        e.preventDefault()
        socket.emit('sendChatMessage', {name, text})
        setFormData({...formData, text:''})
    }

    socket.on('chatMessage', poruka=> setFormData({...formData, poruke: poruke.concat(poruka)  }))
    console.log(poruke)

    return (
        <div >
            <Link to='/dashboard'><h2>DASHBOARD</h2></Link>

            <div className='form'>
                {poruke && poruke.map(poruka=>{return(
                    <>
                    <ul>
                        <li key={uuidv4()}>
                            {poruka.name===name? ('ME'): (poruka.name)}: 
                            <h2>{poruka.text}</h2>
                            <hr/>
                        </li>
                    </ul>
                    </>
                )})}
                <hr/>
                <form onSubmit={onSubmit}>
                <input onChange={onChange} placeholder='chat with group' name='text' value={text} required autoComplete='off'/>
                <button>SEND</button>
                </form>
            </div>
        </div>
    )
}

const mapState= state => ({
    user: state.auth.user
})

export default connect(mapState, {loadUser})(ChatDashboard)




/*
const ENDPIONT = 'localhost:5000'
    const socket = io(ENDPIONT)

    useEffect(()=>{
        loadUser()
        //sending message to server
        socket.emit('join', {name})

        //reciving message from server
        socket.on('svima', text=> console.log(text))

        //sending to evry other user
        socket.emit('sendChatMessage', {name})

        //reciving message from server/another user
        socket.on('chatMessage', text=> console.log(text))


        return()=>{
            socket.emit('disconnect')
            socket.off()
        }
        // eslint-disable-next-line
    }, [])
    */