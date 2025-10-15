import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Shield, Users, Search, Star, ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight">
                Buy & Sell Cars
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
                  Directly From Owners
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                No dealers, no hidden fees. Just genuine people connecting for fair car deals in India's most trusted peer-to-peer marketplace.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <Link
                to="/search"
                className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Search className="w-6 h-6 mr-3" />
                Find Your Dream Car
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/auth/sell"
                className="group inline-flex items-center px-10 py-5 bg-white text-gray-900 border-2 border-gray-200 font-semibold rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Sell Your Car
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>100% Verified Owners</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Secure Transactions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No Dealer Commissions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Why Choose C2C Cars?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of car buying and selling with our transparent, secure platform
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center group p-8 rounded-3xl hover:bg-white hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Verified Owners</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Every seller undergoes mandatory government ID verification. We maintain a pure C2C environment with zero dealer interference.
              </p>
            </div>
            <div className="text-center group p-8 rounded-3xl hover:bg-white hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Car className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Quality Inspections</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Optional professional inspections by trusted partners. Get comprehensive reports for complete peace of mind.
              </p>
            </div>
            <div className="text-center group p-8 rounded-3xl hover:bg-white hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Fair Pricing</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Buy directly from owners and save 15-25% compared to dealer prices. Transparent pricing with no hidden costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div className="space-y-3">
              <div className="text-5xl font-bold text-blue-300">10K+</div>
              <div className="text-gray-300 text-lg">Cars Listed</div>
            </div>
            <div className="space-y-3">
              <div className="text-5xl font-bold text-green-300">8.5K+</div>
              <div className="text-gray-300 text-lg">Successful Sales</div>
            </div>
            <div className="space-y-3">
              <div className="text-5xl font-bold text-purple-300">15K+</div>
              <div className="text-gray-300 text-lg">Happy Customers</div>
            </div>
            <div className="space-y-3">
              <div className="text-5xl font-bold text-orange-300">4.8</div>
              <div className="text-gray-300 text-lg flex items-center justify-center space-x-1">
                <Star className="w-5 h-5 fill-current text-orange-400" />
                <span>Customer Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;