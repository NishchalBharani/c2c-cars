import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { IKContext } from 'imagekitio-react'; // Add this import
import store from './store/store';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AuthInitializer from './components/AuthInitializer';
import './index.css';

// Create a client
const queryClient = new QueryClient();

// ImageKit configuration
const imageKitConfig = {
  publicKey: process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT,
  authenticationEndpoint: process.env.REACT_APP_IMAGEKIT_AUTH_ENDPOINT,
};

function App() {
  console.log("ImageKit config:", imageKitConfig);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <IKContext {...imageKitConfig}> {/* Wrap with IKContext */}
          <AuthInitializer />
          <Router>
            <div className="App">
              <Routes>
                {/* Public Routes */}
                <Route path="/*" element={<MainLayout />} />
                {/* Auth Routes */}
                <Route path="/auth/*" element={<AuthLayout />} />
              </Routes>
              <Toaster position="top-right" />
            </div>
          </Router>
        </IKContext>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;