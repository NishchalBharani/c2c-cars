import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Search,
    Filter,
    MapPin,
    DollarSign,
    Calendar,
    Eye,
    Heart,
    Car
} from 'lucide-react';
import { fetchListings } from '../store/slices/listingsSlice';

const Listings = () => {
    const dispatch = useDispatch();
    const { listings: listingsData, loading, error } = useSelector((state) => state.listings);
    const listings = listingsData || [];

    useEffect(() => {
        dispatch(fetchListings());
    }, [dispatch]);

    useEffect(() => {
        console.log('Listing data', listingsData)
    })

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading listings...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-red-600 text-2xl">⚠</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load listings</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => dispatch(fetchListings())}
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
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Listings</h1>
                    <p className="text-gray-600">Find your perfect car from our verified sellers</p>
                </motion.div>

                {/* Search and Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8"
                >
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search by make, model, or keyword..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                            />
                        </div>
                        <div className="flex gap-4">
                            <select className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none">
                                <option value="">All Categories</option>
                                <option value="cars">Cars</option>
                                <option value="bikes">Bikes</option>
                                <option value="suv">SUV</option>
                                <option value="luxury">Luxury</option>
                                <option value="electronics">Electronics</option>
                            </select>
                            <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-200">
                                <Filter className="w-4 h-4" />
                                <span>Filters</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Listings Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {listings.length} {listings.length === 1 ? 'Listing' : 'Listings'} Available
                        </h2>
                    </div>

                    {listings.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings found</h3>
                            <p className="text-gray-600">Try adjusting your search criteria or check back later.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {listings.map((listing, index) => (
                                <motion.div
                                    key={listing.listing_id || index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                                        {listing.images && listing.images.length > 0 ? (
                                            <img
                                                src={listing.images[0]}
                                                alt={listing.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                                <Car className="w-12 h-12 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 flex space-x-2">
                                            <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition duration-200">
                                                <Heart className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                        {listing.availability === 'sold' && (
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                    Sold
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                                                {listing.title}
                                            </h3>
                                            <span className="text-lg font-bold text-blue-600 ml-2">
                                                ₹{parseFloat(listing.price).toLocaleString()}
                                            </span>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {listing.description}
                                        </p>

                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{listing.city}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(listing.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <Link
                                                to={`/listings/${listing.listing_id}`}
                                                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>View Details</span>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Listings;