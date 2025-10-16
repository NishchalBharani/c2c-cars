import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserCheck, 
  Car, 
  Search, 
  MessageCircle, 
  Shield, 
  DollarSign, 
  FileCheck, 
  Star,
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Create Your Verified Profile",
      description: "Join our trusted community with mandatory ID verification. We ensure every member is genuine to maintain a dealer-free marketplace.",
      icon: UserCheck,
      color: "blue",
      features: ["Government ID Verification", "Phone Number Verification", "Email Confirmation", "Secure Account Setup"]
    },
    {
      step: 2,
      title: "List Your Car in Minutes",
      description: "Create compelling listings with high-quality photos, detailed descriptions, and transparent pricing. Our guided process makes it simple.",
      icon: Car,
      color: "green",
      features: ["Easy Photo Upload", "Smart Pricing Suggestions", "Vehicle History Tracking", "Instant Listing Live"]
    },
    {
      step: 3,
      title: "Connect with Genuine Buyers",
      description: "Use our secure messaging system to communicate with verified buyers. Share details, schedule viewings, and negotiate safely.",
      icon: MessageCircle,
      color: "purple",
      features: ["Secure In-App Messaging", "Schedule Test Drives", "Price Negotiation Tools", "No Personal Contact Sharing"]
    },
    {
      step: 4,
      title: "Complete Secure Transaction",
      description: "Finalize your deal with confidence using our optional secure payment escrow and RTO transfer assistance services.",
      icon: Shield,
      color: "orange",
      features: ["Optional Escrow Service", "RTO Transfer Assistance", "Payment Protection", "Document Verification"]
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Verified Community",
      description: "Every user undergoes mandatory verification. No dealers, just real people.",
      stat: "100% Verified"
    },
    {
      icon: DollarSign,
      title: "Better Prices",
      description: "Save 15-25% compared to dealer prices. Fair value for both buyers and sellers.",
      stat: "Save 20% Avg."
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Optional escrow services and document verification for peace of mind.",
      stat: "100% Secure"
    },
    {
      icon: Star,
      title: "Trusted Reviews",
      description: "Real feedback from real transactions. Build your reputation in the community.",
      stat: "4.8/5 Rating"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              How C2C Cars
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Works
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Experience the future of car buying and selling. Simple, secure, and completely dealer-free.
              Join thousands of satisfied users in India's most trusted peer-to-peer vehicle marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sell"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Selling Your Car
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 font-semibold rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Browse Available Cars
                <Search className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From listing to sale, we've made the entire process smooth and secure for everyone.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                green: 'from-green-500 to-green-600',
                purple: 'from-purple-500 to-purple-600',
                orange: 'from-orange-500 to-orange-600'
              };

              return (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                  className={`flex gap-6 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 group ${
                    index % 2 === 0 ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : 'bg-gradient-to-br from-green-50 to-emerald-50'
                  }`}
                >
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${colorClasses[step.color]} flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className={`w-8 h-8 text-${step.color}-600`} />
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose C2C Cars?
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              We're building India's most trusted automotive community with transparency at our core.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 group hover:scale-105"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-blue-200 text-sm mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="text-2xl font-bold text-green-400">
                    {feature.stat}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who've discovered the better way to buy and sell cars.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/auth/register"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Create Free Account
                <UserCheck className="w-5 h-5 ml-2" />
              </Link>
              <div className="text-gray-500">or</div>
              <Link
                to="/search"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Browse Listings First
                <Search className="w-5 h-5 ml-2" />
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No Listing Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Verified Users Only</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;