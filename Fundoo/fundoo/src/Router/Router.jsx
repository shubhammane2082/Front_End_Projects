import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from '../pages/signIn/SignIn'
import Signup from '../pages/signUp/SignUp'
import Dashboard from '../Dashboard/Dashboard'
import AuthRoute from './AuthRoute'
import ProtectedRoute from './ProtectedRoute'


function Router() {
  return (
    
      <BrowserRouter>
      <Routes>
       <Route path='/' element={<AuthRoute><SignIn/></AuthRoute>}/>
       <Route path='/signup' element={<AuthRoute><Signup/></AuthRoute>}/>
       <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default Router
