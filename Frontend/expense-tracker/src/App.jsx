import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Login from "./Pages/Auth/Login"
import SignUp from "./Pages/Auth/SignUp"
import Home from "./Pages/Daseboard/Home"
import Income from "./Pages/Daseboard/Income"
import Expense from "./Pages/Daseboard/Expense"
const App = () => {
  return (
    <div >
      <Router>
        <Routes>
          <Route path='/' element={<Root/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/daseboard' element={<Home/>}/>
          <Route path='/income' element={<Income/>}/>
          <Route path='/expense' element={<Expense/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

const Root = () => {
  //Check is token exists in local storage
  const isAuthenticated = !!localStorage.getItem("token");
  //redirect to daseboard if authicated,otherwise to login
  return isAuthenticated ? (
    <Navigate to="/daseboard" />
  ) : (
      <Navigate to="/login"/>
  )
};
