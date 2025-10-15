import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import SellCar from '../pages/SellCar';
import Listings from '../pages/Listings';
import ListingDetail from '../pages/ListingDetail';
import ProtectedRoute from '../components/ProtectedRoute';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/sell" element={
            <ProtectedRoute>
              <SellCar />
            </ProtectedRoute>
          } />
          <Route path="/how-it-works" element={<div className="pt-16">How It Works - Coming Soon</div>} />
          <Route path="/my-listings" element={<div className="pt-16">My Listings - Coming Soon</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default MainLayout;