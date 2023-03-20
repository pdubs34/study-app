
import './App.css';
import React, { useState } from 'react';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Flashcard from './client/pages/Flashcard';
import CreateAndEdit from './client/pages/CreateAndEdit';
import LoginPage from './client/pages/LoginPage';
import Layout from './Layout';



export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Flashcard />} />
        <Route exact path="setEditor" element={<CreateAndEdit />} />
        <Route exact path="loginPage" element={<LoginPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}
  

