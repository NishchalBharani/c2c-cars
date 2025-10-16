import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import SellCar from '../pages/SellCar';
import Listings from '../pages/Listings';
import ListingDetail from '../pages/ListingDetail';
import MyListings from '../pages/MyListings';
import HowItWorks from '../pages/HowItWorks'; // Add this import
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
          <Route path="/how-it-works" element={<HowItWorks />} /> {/* Add this route */}
          <Route path="/sell" element={
            <ProtectedRoute>
              <SellCar />
            </ProtectedRoute>
          } />
          <Route path="/my-listings" element={
            <ProtectedRoute>
              <MyListings />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
};

export default MainLayout;