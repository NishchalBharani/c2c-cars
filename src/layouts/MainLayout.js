import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* We'll add more routes here later */}
          <Route path="/search" element={<div className="pt-16">Search Page - Coming Soon</div>} />
          <Route path="/how-it-works" element={<div className="pt-16">How It Works - Coming Soon</div>} />
          <Route path="/sell" element={<div className="pt-16">Sell Your Car - Coming Soon</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default MainLayout;