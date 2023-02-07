
import './App.css';
import React, { useState } from 'react';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Flashcard from './client/pages/Flashcard';
import BoobPage from './client/pages/BoobPage';
import Layout from './Layout';



export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Flashcard />} /> 
        <Route exact path="boobPage" element={<BoobPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}
  

