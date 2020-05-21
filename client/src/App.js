import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import PrivateRoute from './PrivateRoute'
import ChatDashboard from './components/chat/ChatDashboard'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Route exact path='/' component={LandingPage} />
      <Switch>
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/profile/:profile_id' component={Profile} />
        <PrivateRoute exact path='/chatdashboard' component={ChatDashboard} />
      </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
