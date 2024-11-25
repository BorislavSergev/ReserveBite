// src/App.jsx

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero/Hero';
import Header from './components/Header/Header';
import Category from './components/Category/Category';
import Footer from './components/Footer/Footer';
import About from './components/About/About';

// Lazy load your components
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
      <Header/>
        <Routes>
          <Route path="/" element={<><Hero/> <Category/> <About/> </>} />
          
        </Routes>
        <Footer/>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;