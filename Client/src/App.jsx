import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Quantumchat from './components/Quantumchat';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { useEffect } from 'react';
import { validateuser } from './components/Auth/auth';
import ChatProvider from './Context/chatProvider';

function App() {

  useEffect(() => {
    validateuser();
  }, [])
  

  return (
    <ChatProvider>
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
      </ChatProvider>
  
  )
}

export default App
