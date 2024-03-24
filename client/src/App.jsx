import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Quantumchat from './components/Quantumchat';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { useEffect } from 'react';
import ChatProvider from './Context/chatProvider';
import SaveToken from './components/Auth/SaveToken';
import ForgotPassword from './components/Auth/ForgotPassword';

function App() {
  return (
    <ChatProvider>
      <BrowserRouter>
        <Routes>
         
          <Route path='/signup' element={<Register />} />

          <Route path='/login' element={<Login/>} />
          <Route path='/resetPassword/:token' element={<ForgotPassword/>} />
          <Route path='/saveToken' element={<SaveToken/>} />
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
