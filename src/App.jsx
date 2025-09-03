import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import GalleryPage from './pages/GalleryPage';
import TimelinePage from './components/Timeline';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route 
        path="/gallery" 
        element={
          <>
            <Navbar activeView="gallery" />
            <GalleryPage />
          </>
        } 
      />
      <Route path="/timeline" element={<TimelinePage />} />
    </Routes>
  );
}

export default App;