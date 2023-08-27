import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { LoginPage, SignupPage, ActivationPage, HomePage, ChatRoomPage } from "./routes/Routes.js";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Store from "./redux/store";
import {loadUser} from "./redux/actions/userActions.js"

import ProtectedRoute from './routes/ProtectedRoute.js';


const App = () => {


  useEffect(() => {
    Store.dispatch(loadUser());

  }, [])


  return (
    <BrowserRouter>
      <Routes>
      <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />

        <Route path="/new-room" element={
            <ProtectedRoute>
              <ChatRoomPage />
            </ProtectedRoute>
          } />



  

  
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App
