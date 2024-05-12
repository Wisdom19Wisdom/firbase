import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { auth } from './config/Firebase';
import { Navigate } from 'react-router-dom/dist';

const App = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    })
  })
  return (
    <>
      <Routes>
        <Route path='' element={user ? <Navigate to="/home"/> : <Login/>}/>
        <Route path='*' element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
        <ToastContainer/>
        </>
      
  )
}

export default App
