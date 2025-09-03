// src/pages/GalleryPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 

import Navbar from '../components/Navbar';
import Welcome from '../components/Home'; 
import Timeline from '../components/Timeline';
import PhotoGallery from '../components/PhotoGallery';

function GalleryPage() {
  // Jadikan 'home' sebagai view default
  const [activeView, setActiveView] = useState('home');

  return (
    <div className="bg-brand-background min-h-screen">
      <Navbar activeView={activeView} onNavigate={setActiveView} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tambahkan logika untuk menampilkan Welcome */}
            {activeView === 'home' && <Welcome />}
            {activeView === 'timeline' && <Timeline />}
            {activeView === 'gallery' && <PhotoGallery />}
            {activeView === 'about' && <About />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
export default GalleryPage;