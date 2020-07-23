import React from 'react';
import {BrowserRouter as Router, Redirect, Route,Switch} from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'

function Main(){
  return (
    <Router>
    <Switch>
    <Route path='/adminIndex' component = {AdminIndex}></Route>
    <Route path='/login' exact component = {Login}></Route>
    <Redirect to='/login'></Redirect>
    </Switch>
    </Router>
  )
}
export default Main