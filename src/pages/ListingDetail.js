import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Calendar,
  User,
  Shield,
  Phone,
  MessageCircle,
  Heart,
  CheckCircle
} from 'lucide-react';
import { fetchListingById } from '../store/slices/listingsSlice';

const ListingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentListing: currentListingData, loading, error } = useSelector(
    (state) => state.listings
  );
  const currentListing = currentListingData || {};

  // 🖼️ Manage selected image
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchListingById(id));
    }
  }, [id, dispatch]);

  // When data changes, set the first image as default
  useEffect(() => {
    if (currentListing?.images?.length > 0) {
      setSelectedImage(currentListing.images[0]);
    }
  }, [currentListing]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (error || !currentListing) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {error || 'Listing not found'}
          </h3>
          <button
            onClick={() => dispatch(fetchListingById(id))}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to listings</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 🖼️ Image Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <img
                src={selectedImage || '/placeholder-car.jpg'}
                alt={currentListing.title}
                className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
              />
              {currentListing.availability === 'sold' && (
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-2 rounded-full text-sm font-semibold">
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {/* 🖼️ Thumbnail selector */}
            {currentListing.images && currentListing.images.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {currentListing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === image
                        ? 'border-blue-600'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${currentListing.title} ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* 🔍 Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title and Price */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-gray-900 flex-1">
                  {currentListing.title}
                </h1>
                <span className="text-3xl font-bold text-blue-600 ml-4">
                  ₹{parseFloat(currentListing.price).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{currentListing.city}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Listed{' '}
                    {new Date(currentListing.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    currentListing.availability === 'available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {currentListing.availability === 'available'
                    ? 'Available'
                    : 'Sold'}
                </div>
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Verified Listing</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentListing.description}
              </p>
            </div>

            {/* Category */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Category
              </h2>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {currentListing.category}
                </span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Seller Information
              </h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {currentListing.full_name}
                  </h3>
                  <p className="text-gray-600 text-sm">Verified Member</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <Shield className="w-4 h-4" />
                <span className="text-sm">ID Verified Seller</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex space-x-4">
                <button
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2"
                  disabled={currentListing.availability !== 'available'}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>
                    {currentListing.availability === 'available'
                      ? 'Contact Seller'
                      : 'Not Available'}
                  </span>
                </button>
                <button
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition duration-200 flex items-center justify-center space-x-2"
                  disabled={currentListing.availability !== 'available'}
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </button>
                <button className="w-12 h-12 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition duration-200 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              {currentListing.availability !== 'available' && (
                <p className="text-red-500 text-sm mt-3 text-center">
                  This item is no longer available for purchase
                </p>
              )}
            </div>

            {/* Listing Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Listing Information
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Listing ID:</span>
                  <p className="font-medium">{currentListing.listing_id}</p>
                </div>
                <div>
                  <span className="text-gray-500">Category:</span>
                  <p className="font-medium capitalize">
                    {currentListing.category}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Listed On:</span>
                  <p className="font-medium">
                    {new Date(
                      currentListing.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <p className="font-medium capitalize">
                    {currentListing.availability}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
