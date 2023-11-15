
import './App.css';
import React, { useState } from 'react';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Flashcard from './client/pages/Flashcard';
import CreateAndEdit from './client/pages/CreateAndEdit';
import LoginPage from './client/pages/LoginPage';
import Confirm from './client/pages/Confirm';
import Layout from './Layout';
import Home from './client/pages/Home';
import MakeSet from './client/pages/MakeSet';


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route exact path="setEditor" element={<CreateAndEdit />} />
        <Route exact path="study" element={<Flashcard />} />
        <Route exact path="loginPage" element={<LoginPage />} />
        <Route exact path="confirm" element={<Confirm/>}/>
        <Route exact path="makeSet" element={<MakeSet/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}
  

