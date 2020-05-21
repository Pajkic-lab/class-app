import React, {useState, Fragment} from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../actions.js/alert'
import Alert from './Alert'
import { register, login } from '../actions.js/auth'

const LandingPage = ({setAlert, register, login, history}) => {
    const[formData,  setFormData] = useState({
        switcher: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const {name, email, password, confirmPassword, switcher}=formData

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

    const swaping = () => 
    setFormData({ switcher: !switcher, name:'', email:'', password:'', confirmPassword:'' })

    const reg = e => {
        e.preventDefault()
        if(password === confirmPassword) {
            register({name, email, password, history})
            setFormData({...formData, name:'', email:'', password:'', confirmPassword: ''})
        } else {
            setAlert('PASSOWRDS DO NOT MATCH !')
        }
    }

    const log = e => {
        e.preventDefault()
        login({email, password, history})
        setFormData({...formData, name:'', email:'', password:'', confirmPassword: ''})
    }
    return (
        <Fragment>
            <Alert />
        <div className='form'>
            <button onClick={swaping}> {switcher === true? 'LOGIN' : 'REGISTER'} </button> <br/>
            { switcher===true ? (
            <form onSubmit={reg}>
                <h1>REGISTER</h1>
                <input onChange={onChange} name='name' placeholder='name' value={name} /> <br/>
                <input onChange={onChange} name='email' placeholder='email' value={email} /> <br/>
                <input onChange={onChange} name='password' placeholder='password' value={password} /> <br/>
                <input onChange={onChange} name='confirmPassword' placeholder='confirmPassword' value={confirmPassword} /> <br/>
                <button>SUBMIT</button>
            </form>)
             : (
            <form onSubmit={log}>
                <h1>LOGIN</h1>
                <input onChange={onChange} name='email' placeholder='email' value={email} /> <br/>
                <input onChange={onChange} name='password' placeholder='password' value={password} /> <br/>
                <button>SUBMIT</button>
            </form>
             )}
        </div>  
        </Fragment>
    )
}

export default connect(null, {setAlert, register, login})(LandingPage)
