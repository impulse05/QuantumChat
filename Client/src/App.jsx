import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Quantumchat from './components/Quantumchat';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { useEffect } from 'react';
import { validateuser } from './components/Auth/auth';

function App() {

  useEffect(() => {
    validateuser();
  }, [])
  

  return (
  
      <BrowserRouter>
        <Routes>
         
          <Route path='/signup' element={<Register />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/*' element={
            <ProtectedRoute>
              <Quantumchat />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
  
  )
}

export default App
