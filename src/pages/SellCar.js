import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { IKUpload } from 'imagekitio-react';
import {
  Car,
  DollarSign,
  MapPin,
  Camera,
  Upload,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  X,
  Link as LinkIcon,
  Image as ImageIcon
} from 'lucide-react';
import { createListing, clearError, clearSuccess } from '../store/slices/listingsSlice';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/constants';

// Validation schema for car listing
const listingSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .min(1, 'Description is required')
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce.number()
    .min(1000, 'Price must be at least ₹1,000')
    .max(100000000, 'Price must be reasonable'),
  city: z.string().min(1, 'City is required'),
  images: z.array(z.string().url('Must be a valid URL')).min(1, 'At least one image is required'),
});

const SellCar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.listings);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [imageUrls, setImageUrls] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState({});
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      category: 'cars',
      price: '',
      images: [],
    },
  });

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);

  // Clear errors and success messages
  React.useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success) {
      toast.success('Car listed successfully!');
      dispatch(clearSuccess());
      navigate('/my-listings');
    }
  }, [error, success, dispatch, navigate]);

  // Update form images when uploadedImages or imageUrls change
  React.useEffect(() => {
    const allImages = [...uploadedImages, ...imageUrls];
    setValue('images', allImages, { shouldValidate: true });
  }, [uploadedImages, imageUrls, setValue]);

  const handleUploadSuccess = (response) => {
    setUploadedImages(prev => [...prev, response.url]);
    setUploadProgress(prev => {
      const copy = { ...prev };
      delete copy[response.fileId]; // remove completed
      return copy;
    });
    toast.success('Image uploaded successfully!');
  };

  const handleUploadError = (error) => {
    console.error('❌ Upload error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      fullError: JSON.stringify(error, null, 2)
    });

    // Check if it's an authentication error
    if (error.message.includes('authenticator') || error.message.includes('authentication')) {
      console.log('🔐 Testing authentication endpoint...');
      // Test the auth endpoint directly
      fetch(`${API_BASE_URL}/auth/imagekit`)
        .then(res => res.json())
        .then(data => console.log('🔐 Auth endpoint response:', data))
        .catch(err => console.error('🔐 Auth endpoint test failed:', err));
    }

    toast.error(`Upload failed: ${error.message}`);
  };

  const handleUploadStart = (evt) => {
    const file = evt?.file || evt?.target?.files?.[0] || evt;
    const fileId = file?.name || `file-${Date.now()}`;

    // Save fileId on the file object so we can reference it later
    file.fileId = fileId;

    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
  };


  const handleUploadProgress = (progressEvent) => {
    const loaded = progressEvent.loaded || 0;
    const total = progressEvent.total || 1; // prevent divide by zero
    const percent = Math.round((loaded / total) * 100);

    // Get the correct fileId
    const fileId = progressEvent?.target?.file?.fileId || progressEvent?.target?.fileName || 'unknown';

    setUploadProgress(prev => ({
      ...prev,
      [fileId]: percent,
    }));
  };

  const removeUploadedImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeImageUrl = (index) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const addImageUrl = () => {
    if (newImageUrl.trim() && isValidUrl(newImageUrl)) {
      setImageUrls(prev => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
      setShowUrlInput(false);
    } else {
      toast.error('Please enter a valid URL');
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const onSubmit = async (data) => {
    console.log('Form submitted with data:', data);
    try {
      const result = await dispatch(createListing(data)).unwrap();
      console.log('Listing created successfully:', result);
    } catch (error) {
      console.error('Failed to create listing:', error);
      toast.error(error || 'Failed to create listing.');
    }
  };

  const authenticator = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/imagekit`);
    const data = await response.json();
    return data; // must include { signature, expire, token }
  };

  const handleNextStep = async () => {
    let fieldsToValidate = [];

    if (currentStep === 1) {
      fieldsToValidate = ['title', 'description', 'category'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['price', 'city'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    { number: 1, title: 'Car Details', icon: Car },
    { number: 2, title: 'Price & Location', icon: DollarSign },
    { number: 3, title: 'Photos', icon: Camera },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Sell Your Car</h1>
          <p className="text-gray-600 mt-2">List your car and reach thousands of potential buyers</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className={`flex items-center space-x-3 ${index < steps.length - 1 ? 'flex-1' : ''
                    }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : isCurrent
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                      }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span className={`font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 transition-all duration-300 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Car Details - Unchanged */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900">Car Details</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="e.g., 2022 Hyundai Creta SX, Excellent Condition"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.title.message}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                    placeholder="Describe your car's features, condition, maintenance history, etc."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.description.message}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    {...register('category')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                  >
                    <option value="cars">Cars</option>
                    <option value="bikes">Bikes</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury Cars</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.category.message}</span>
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-200"
                >
                  Continue to Pricing
                </button>
              </motion.div>
            )}

            {/* Step 2: Price & Location - Unchanged */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900">Price & Location</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <div className="relative">
                    <DollarSign className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      {...register('price')}
                      type="number"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                      placeholder="Enter price in rupees"
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.price.message}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      {...register('city')}
                      type="text"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                      placeholder="Enter your city"
                    />
                  </div>
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.city.message}</span>
                    </p>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-200"
                  >
                    Continue to Photos
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Photos - UPDATED WITH IMAGEKIT */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900">Car Photos</h2>
                <p className="text-gray-600">Upload high-quality photos of your car. First image will be the cover photo.</p>

                {/* ImageKit Upload Section */}
                <div className="space-y-4">
                  {/* Primary Upload - ImageKit */}
                  <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 bg-blue-50 text-center">
                    <ImageIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Car Photos</h3>
                    <p className="text-gray-600 mb-4">Drag & drop or click to upload images from your device</p>

                    <IKUpload
                      fileName="car-listing"
                      authenticator={authenticator}   // ✅ Added earlier
                      onError={handleUploadError}
                      onSuccess={handleUploadSuccess}
                      onUploadProgress={handleUploadProgress}
                      onUploadStart={handleUploadStart}
                      className="hidden"
                      id="imagekit-upload"
                      accept="image/*"
                      multiple
                      useUniqueFileName={true}
                    />

                    <label
                      htmlFor="imagekit-upload"
                      className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Choose Files</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG, WEBP up to 10MB each</p>
                  </div>

                  

                  {/* Uploaded Images Preview */}
                  {(uploadedImages.length > 0 || imageUrls.length > 0) && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Uploaded Images ({uploadedImages.length + imageUrls.length})</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* Uploaded Images from ImageKit */}
                        {uploadedImages.map((url, index) => (
                          <div key={`uploaded-${index}`} className="relative group">
                            <img
                              src={url}
                              alt={`Uploaded ${index + 1}`}
                              className="w-full h-24 object-cover rounded-xl border-2 border-green-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeUploadedImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-1 rounded">
                              Uploaded
                            </div>
                          </div>
                        ))}

                        {/* Image URLs */}
                        {imageUrls.map((url, index) => (
                          <div key={`url-${index}`} className="relative group">
                            <img
                              src={url}
                              alt={`URL Image ${index + 1}`}
                              className="w-full h-24 object-cover rounded-xl border-2 border-blue-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImageUrl(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                              URL
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add Image URL Option */}
                  <div className="border-t pt-4">
                    {!showUrlInput ? (
                      <button
                        type="button"
                        onClick={() => setShowUrlInput(true)}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      >
                        <LinkIcon className="w-4 h-4" />
                        <span>Add image via URL instead</span>
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <input
                            type="url"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            placeholder="Paste image URL here"
                            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                          <button
                            type="button"
                            onClick={addImageUrl}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowUrlInput(false)}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">Use this for images already hosted online</p>
                      </div>
                    )}
                  </div>
                </div>

                {errors.images && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.images.message}</span>
                  </p>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || (uploadedImages.length === 0 && imageUrls.length === 0)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Listing Car...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>List My Car</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SellCar;