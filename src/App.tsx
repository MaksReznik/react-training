import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginContainer from './pages/login/components/LoginContainer/LoginContainer';
import GeneralLayout from './shared/layouts/GeneralLayout/GeneralLayout';

function App() {
  return (
    <Routes>
      <Route element={<GeneralLayout />}>
        <Route element={<LoginContainer></LoginContainer>} path="/"></Route>
        <Route element={<Navigate to="/" />} path="*"></Route>
      </Route>
    </Routes>
  );
}

export default App;
